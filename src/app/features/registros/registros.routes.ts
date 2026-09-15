import { Routes } from '@angular/router';

export const registrosRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/registros.page').then(m => m.RegistrosPage)
  }
];
