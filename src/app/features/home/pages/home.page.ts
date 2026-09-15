import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { WeatherService } from '../../../core/services/weather.service';
import { RegistrosService } from '../../../core/services/registros.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner]
})
export class HomePage {
  private router = inject(Router);
  private weatherService = inject(WeatherService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  registrosService = inject(RegistrosService);

  cargando = false;

  async ionViewWillEnter() {
    this.cargando = false;
    await this.registrosService.cargar();
  }

  irARegistros() {
    this.router.navigate(['/registros']);
  }

  async consultarClima() {
    this.cargando = true;
    const permiso = await this.pedirPermisoGPS();
    if (!permiso) {
      this.cargando = false;
      return;
    }
    try {
      const posicion = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 15000 });
      const lat = posicion.coords.latitude;
      const lon = posicion.coords.longitude;
      this.weatherService.getClima(lat, lon).subscribe({
        next: async (respuesta) => {
          this.cargando = false;
          await this.mostrarDialogo(lat, lon, respuesta.current.temperature_2m, respuesta.current.apparent_temperature, respuesta.current.relative_humidity_2m, respuesta.current.wind_speed_10m);
        },
        error: async () => {
          this.cargando = false;
          await this.mostrarMensaje('No se pudo consultar el clima');
        }
      });
    } catch (error) {
      this.cargando = false;
      await this.mostrarDialogoActivarGPS();
    }
  }

  async pedirPermisoGPS(): Promise<boolean> {
    try {
      let estado = await Geolocation.checkPermissions();
      if (estado.location !== 'granted') {
        const aviso = await this.alertController.create({
          header: 'Permiso de ubicación',
          message: 'La app necesita tu ubicación GPS para consultar el clima donde estás.',
          buttons: [
            { text: 'No ahora', role: 'cancel' },
            { text: 'Permitir' }
          ]
        });
        await aviso.present();
        const resultado = await aviso.onDidDismiss();
        if (resultado.role === 'cancel') {
          return false;
        }
        estado = await Geolocation.requestPermissions();
      }
      if (estado.location !== 'granted') {
        await this.mostrarDialogoPermisoDenegado();
        return false;
      }
      return true;
    } catch (error) {
      await this.mostrarDialogoPermisoDenegado();
      return false;
    }
  }

  async mostrarDialogoPermisoDenegado() {
    const alerta = await this.alertController.create({
      header: 'Sin acceso al GPS',
      message: 'Denegaste el permiso. Actívalo en Ajustes del teléfono, Aplicaciones, Clima GPS, Permisos, Ubicación, Permitir.',
      buttons: [{ text: 'Entendido' }]
    });
    await alerta.present();
  }

  async mostrarDialogoActivarGPS() {
    const alerta = await this.alertController.create({
      header: 'Activa el GPS',
      message: 'No se pudo obtener tu ubicación. Activa la Ubicación del teléfono e intenta de nuevo.',
      buttons: [{ text: 'Entendido' }]
    });
    await alerta.present();
  }

  async mostrarDialogo(lat: number, lon: number, temperatura: number, sensacion: number, humedad: number, viento: number) {
    const alerta = await this.alertController.create({
      header: 'Clima actual',
      message: `Latitud: ${lat.toFixed(4)}\nLongitud: ${lon.toFixed(4)}\nTemperatura: ${temperatura} °C\nSensación: ${sensacion} °C\nHumedad: ${humedad} %\nViento: ${viento} km/h`,
      buttons: [
        { text: 'Cerrar', role: 'cancel' },
        {
          text: 'Registrar',
          handler: async () => {
            await this.registrosService.agregar({ latitud: lat, longitud: lon, temperatura, sensacion, humedad, viento });
            await this.mostrarMensaje('Registro guardado correctamente');
          }
        }
      ]
    });
    await alerta.present();
  }

  async mostrarMensaje(texto: string) {
    const toast = await this.toastController.create({ message: texto, duration: 2000, position: 'bottom' });
    await toast.present();
  }
}
