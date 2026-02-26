import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ubicaciones',
    pathMatch: 'full',
  },
  {
    path: 'ubicaciones',
    loadComponent: () =>
      import('./presentation/pages/ubications/ubications').then((c) => c.Ubications),
  },
  {
    path: 'forecast/:stateCode',
    loadComponent: () => import('./presentation/pages/forecast/forecast').then((c) => c.Forecast),
  },
  {
    path: '**',
    redirectTo: 'ubicaciones',
  },
];
