import { Routes } from '@angular/router';

export const climaFotografiaRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/clima-fotografia.page').then(m => m.ClimaFotografiaPage)
  },
];
