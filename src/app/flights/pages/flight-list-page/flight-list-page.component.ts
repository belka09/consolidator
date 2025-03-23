import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { FlightFiltersComponent } from '../../components/flight-filters/flight-filters.component';
import { FlightCardComponent } from '../../components/flight-card/flight-card.component';
import { FlightOffer } from '../../../shared/models/flight-offer.interface';
import { FlightDataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-flight-list-page',
  standalone: true,
  imports: [
    CommonModule,
    FlightFiltersComponent,
    ButtonModule,
    FlightCardComponent,
  ],
  templateUrl: './flight-list-page.component.html',
  styleUrls: ['./flight-list-page.component.scss'],
})
export class FlightListPageComponent implements OnInit {
  allFlights: FlightOffer[] = [];
  filteredFlights: FlightOffer[] = [];

  minPrice = 0;
  maxPrice = 10000;

  visibleCount = 5;
  dataLoaded = false;

  constructor(private flightDataService: FlightDataService) {}

  ngOnInit() {
    this.allFlights = this.flightDataService.getAllFlights();
    this.filteredFlights = [...this.allFlights];

    if (this.allFlights.length > 0) {
      this.minPrice = Math.min(...this.allFlights.map((f) => f.price));
      this.maxPrice = Math.max(...this.allFlights.map((f) => f.price));
    }

    this.dataLoaded = true;
  }

  get allFlightsShown(): boolean {
    return this.visibleCount >= this.filteredFlights.length;
  }

  public onFiltersChange(filters: any) {
    const [minP, maxP] = filters.priceRange;
    let flights = this.allFlights.filter(
      (f) => f.price >= minP && f.price <= maxP
    );

    if (filters.sortBy === 'priceAsc') {
      flights.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'priceDesc') {
      flights.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'departureAsc') {
      flights.sort(
        (a, b) => this.getEarliestDeparture(a) - this.getEarliestDeparture(b)
      );
    } else if (filters.sortBy === 'departureDesc') {
      flights.sort(
        (a, b) => this.getEarliestDeparture(b) - this.getEarliestDeparture(a)
      );
    }

    const selectedStops: number[] = filters.stops;
    if (!selectedStops.includes(-1)) {
      flights = flights.filter((offer) => {
        const totalStops = this.getTotalStops(offer);
        return selectedStops.includes(totalStops);
      });
    }

    this.filteredFlights = flights;
    this.visibleCount = 5;
  }

  public onShowMore() {
    this.visibleCount += 5;
  }

  private getTotalStops(offer: FlightOffer): number {
    return offer.flights.reduce((acc, seg) => acc + seg.stops, 0);
  }

  private getEarliestDeparture(offer: FlightOffer): number {
    let minTime = Infinity;
    for (const seg of offer.flights) {
      const segTime = this.parseDateTime(
        seg.departure_date,
        seg.departure_time
      );
      if (segTime < minTime) {
        minTime = segTime;
      }
    }
    return minTime;
  }

  private parseDateTime(dateStr: string, timeStr: string): number {
    const dateTimeString = `${dateStr}T${timeStr}`;
    return new Date(dateTimeString).getTime();
  }
}
