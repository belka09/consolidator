import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightOffer } from '../../shared/models/flight-offer.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly flightsUrl =
    'https://public-front-bucket.s3.eu-central-1.amazonaws.com/test/test_flights.json';
  private readonly airlineLogoCdn = 'https://d263qmvlt29h99.cloudfront.net';

  constructor(private http: HttpClient) {}

  getFlights(): Observable<FlightOffer[]> {
    return this.http.get<FlightOffer[]>(this.flightsUrl);
  }

  getAirlineLogoUrl(airlineCode: string): string {
    return `${this.airlineLogoCdn}/${airlineCode}.svg`;
  }
}
