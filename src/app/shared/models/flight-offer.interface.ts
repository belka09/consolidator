import { FlightSegment } from './flight-segment.interface';

export interface FlightOffer {
  id: number;
  price: number;
  flights: FlightSegment[];
}
