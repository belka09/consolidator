import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightOffer } from '../../shared/models/flight-offer.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly flightsUrl = environment.flightsUrl;
  private readonly airlineLogoCdn = environment.airlineLogoCdn;

  constructor(private http: HttpClient) {}

  getFlights(): Observable<FlightOffer[]> {
    return this.http.get<FlightOffer[]>(this.flightsUrl);
  }

  getAirlineLogoUrl(airlineCode: string): string {
    return `${this.airlineLogoCdn}/${airlineCode}.svg`;
  }
}
