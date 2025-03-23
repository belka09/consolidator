import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';

import { ApiService } from '../../../core/services/api.service';
import { FlightFiltersComponent } from '../../components/flight-filters/flight-filters.component';
import { FlightCardComponent } from '../../components/flight-card/flight-card.component';
import { FlightOffer } from '../../../shared/models/flight-offer.interface';

@Component({
  selector: 'app-flight-list-page',
  imports: [
    CommonModule,
    FlightFiltersComponent,
    ButtonModule,
    FlightCardComponent,
  ],
  templateUrl: './flight-list-page.component.html',
  styleUrl: './flight-list-page.component.scss',
})
export class FlightListPageComponent implements OnInit {
  flights: FlightOffer[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getFlights().subscribe((data) => {
      this.flights = data;
      console.log('Loaded flights:', data);
    });
  }

  private getLogoUrl(airline: string): string {
    return this.apiService.getAirlineLogoUrl(airline);
  }

  public onShowMore() {
    console.log('Show more clicked');
  }
}
