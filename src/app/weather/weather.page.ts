import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class WeatherPage {
  private weatherService = inject(WeatherService);
  
  paises: any[] = [];
  paisSeleccionado: any = null;
  climaData: any = null;
  cargando = false;
  error = '';

  constructor() {
    this.paises = this.weatherService.getPaises();
  }

  consultarClima() {
    if (!this.paisSeleccionado) return;

    this.cargando = true;
    this.error = '';
    this.climaData = null;

    this.weatherService.getClima(
      this.paisSeleccionado.lat,
      this.paisSeleccionado.lon
    ).subscribe({
      next: (data) => {
        this.climaData = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al obtener el clima';
        this.cargando = false;
      }
    });
  }

  // Convertir hora UTC a local
  convertirHoraLocal(utcTime: string): string {
    if (!utcTime) return '';
    const fecha = new Date(utcTime);
    return fecha.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getDescripcion(code: number): string {
    if (!code) return 'Variable';
    const desc: any = {
      0: 'Despejado',
      1: 'Parcialmente nublado',
      2: 'Nublado',
      3: 'Muy nublado',
      45: 'Niebla',
      51: 'Llovizna',
      53: 'Llovizna moderada',
      55: 'Llovizna intensa',
      61: 'Lluvia ligera',
      63: 'Lluvia moderada',
      65: 'Lluvia intensa',
      71: 'Nieve ligera',
      73: 'Nieve moderada',
      75: 'Nieve intensa',
      80: 'Chubascos ligeros',
      81: 'Chubascos moderados',
      82: 'Chubascos fuertes',
      95: 'Tormenta',
      96: 'Tormenta con granizo'
    };
    return desc[code] || 'Variable';
  }
}