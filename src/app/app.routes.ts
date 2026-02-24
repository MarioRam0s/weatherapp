import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./presentation/pages/ubications/ubications').then((c) => c.Ubications),
  },
  {
    path: 'forecast',
    loadComponent: () => import('./presentation/pages/forecast/forecast').then((c) => c.Forecast),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
