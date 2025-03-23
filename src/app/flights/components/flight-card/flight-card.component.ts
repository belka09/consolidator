import { Component, effect, input } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { FlightSegment } from '../../../shared/models/flight-segment.interface';
import { FlightOffer } from '../../../shared/models/flight-offer.interface';
import { TimeFormatPipe } from '../../../shared/pipes/time-format.pipe';
import { ShortDateFormatPipe } from '../../../shared/pipes/short-date.pipe';
import { DurationFormatPipe } from '../../../shared/pipes/duration.pipe';
import { ButtonModule } from 'primeng/button';
import { PriceFormatPipe } from '../../../shared/pipes/price.pipe';

@Component({
  selector: 'app-flight-card',
  imports: [
    CommonModule,
    TimeFormatPipe,
    ShortDateFormatPipe,
    DurationFormatPipe,
    PriceFormatPipe,
    ButtonModule,
  ],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss',
})
export class FlightCardComponent {
  readonly flight = input<FlightOffer>();

  constructor(private apiService: ApiService) {
    effect(() => {
      const flight = this.flight();

      console.log(flight);
    });
  }

  public getLogoUrl(airline: string): string {
    return this.apiService.getAirlineLogoUrl(airline);
  }
}
