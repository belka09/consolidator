import { Component, input } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { FlightOffer } from '../../../shared/models/flight-offer.interface';
import { TimeFormatPipe } from '../../../shared/pipes/time-format.pipe';
import { ShortDateFormatPipe } from '../../../shared/pipes/short-date.pipe';
import { DurationFormatPipe } from '../../../shared/pipes/duration.pipe';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-flight-card',
  imports: [
    CommonModule,
    TimeFormatPipe,
    ShortDateFormatPipe,
    DurationFormatPipe,
    ButtonModule,
  ],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss',
})
export class FlightCardComponent {
  readonly flight = input<FlightOffer>();

  constructor(private apiService: ApiService) {}

  public getLogoUrl(airline: string): string {
    return this.apiService.getAirlineLogoUrl(airline);
  }
}
