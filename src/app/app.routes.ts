import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'flights',
    pathMatch: 'full',
  },
  {
    path: 'flights',
    loadComponent: () =>
      import(
        './flights/pages/flight-list-page/flight-list-page.component'
      ).then((m) => m.FlightListPageComponent),
  },
  {
    path: 'traveler',
    loadComponent: () =>
      import('./travelers/pages/traveler-page/traveler-page.component').then(
        (m) => m.TravelerPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'flights',
  },
];
