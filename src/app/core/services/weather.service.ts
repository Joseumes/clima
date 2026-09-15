import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherResponse } from '../../domain/weather/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';
  private http = inject(HttpClient);

  getClima(lat: number, lon: number): Observable<WeatherResponse> {
    const url = `${this.apiUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m`;
    return this.http.get<WeatherResponse>(url);
  }
}
