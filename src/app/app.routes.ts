import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.routes').then(m => m.homeRoutes)
  },
  {
    path: 'weather',
    loadChildren: () => import('./features/weather/weather.routes').then(m => m.weatherRoutes)
  },
  {
    path: 'clima-fotografia',
    loadChildren: () => import('./features/clima-fotografia/clima-fotografia.routes').then(m => m.climaFotografiaRoutes)
  },
];
