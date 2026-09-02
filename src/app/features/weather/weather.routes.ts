import { Routes } from '@angular/router';

export const weatherRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/weather.page').then(m => m.WeatherPage)
  },
];
