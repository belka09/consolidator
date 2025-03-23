import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  makeEnvironmentProviders,
} from '@angular/core';
import { FlightDataService } from '../services/data.service';

export function provideFlightDataInitializer(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: FlightDataService,
      useClass: FlightDataService,
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useFactory: (flightDataService: FlightDataService) => () => {
        return flightDataService.loadFlights();
      },
      deps: [FlightDataService],
    },
  ]);
}
