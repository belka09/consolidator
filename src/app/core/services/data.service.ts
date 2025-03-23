import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FlightOffer } from '../../shared/models/flight-offer.interface';

@Injectable({ providedIn: 'root' })
export class FlightDataService {
  private flights: FlightOffer[] = [];

  constructor(private api: ApiService) {}

  loadFlights(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.api.getFlights().subscribe({
        next: (data) => {
          this.flights = data;
          resolve();
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  getAllFlights(): FlightOffer[] {
    return this.flights;
  }
}
