import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  getPaises() {
    return [
      { nombre: 'España', capital: 'Madrid', lat: 40.4165, lon: -3.7026 },
      { nombre: 'Francia', capital: 'París', lat: 48.8566, lon: 2.3522 },
      { nombre: 'Alemania', capital: 'Berlín', lat: 52.52, lon: 13.405 },
      { nombre: 'Italia', capital: 'Roma', lat: 41.9028, lon: 12.4964 },
      { nombre: 'Reino Unido', capital: 'Londres', lat: 51.5074, lon: -0.1278 },
      { nombre: 'México', capital: 'CDMX', lat: 19.4326, lon: -99.1332 },
      { nombre: 'Argentina', capital: 'Buenos Aires', lat: -34.6037, lon: -58.3816 },
      { nombre: 'Brasil', capital: 'Brasilia', lat: -15.7939, lon: -47.8828 },
      { nombre: 'Chile', capital: 'Santiago', lat: -33.4489, lon: -70.6693 },
      { nombre: 'Colombia', capital: 'Bogotá', lat: 4.7110, lon: -74.0721 },
      { nombre: 'Perú', capital: 'Lima', lat: -12.0464, lon: -77.0428 },
      { nombre: 'Japón', capital: 'Tokio', lat: 35.6762, lon: 139.6503 },
      { nombre: 'China', capital: 'Pekín', lat: 39.9042, lon: 116.4074 },
      { nombre: 'India', capital: 'Nueva Delhi', lat: 28.6139, lon: 77.2090 },
      { nombre: 'Australia', capital: 'Canberra', lat: -35.2809, lon: 149.1300 }
    ];
  }

  constructor(private http: HttpClient) {}

  // Método para obtener el clima
  getClima(lat: number, lon: number): Observable<any> {
    // Asegurarse que la URL está bien formada
    const url = `${this.apiUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,weather_code`;
    console.log('URL:', url); // Para debug
    return this.http.get(url);
  }
}