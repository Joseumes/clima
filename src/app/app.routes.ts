import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'clima-fotografia',
    loadComponent: () => import('./clima-fotografia/clima-fotografia.page').then( m => m.ClimaFotografiaPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'weather',
    loadComponent: () => import('./weather/weather.page').then(m => m.WeatherPage)
  },
  
];