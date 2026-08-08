import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // ← Importante
import { provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), 
    provideIonicAngular({
      mode: 'md'
    })
  ]
};