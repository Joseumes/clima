import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonCheckbox, IonThumbnail } from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { RegistrosService } from '../../../core/services/registros.service';
import { RegistroClima } from '../../../domain/weather/weather.model';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonCheckbox, IonThumbnail]
})
export class RegistrosPage {
  private router = inject(Router);
  private toastController = inject(ToastController);
  private alertController = inject(AlertController);
  registrosService = inject(RegistrosService);

  guardarEnGaleria: Record<number, boolean> = {};

  async ionViewWillEnter() {
    await this.registrosService.cargar();
  }

  volver() {
    this.router.navigate(['/home']);
  }

  async tomarFoto(registro: RegistroClima) {
    const permiso = await this.pedirPermisoCamara();
    if (!permiso) {
      return;
    }
    try {
      const foto = await Camera.getPhoto({
        quality: 60,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.DataUrl,
        saveToGallery: this.guardarEnGaleria[registro.id] === true
      });
      if (foto.dataUrl) {
        await this.registrosService.actualizarFoto(registro.id, foto.dataUrl);
        await this.mostrarMensaje('Fotografía guardada correctamente');
      }
    } catch (error: any) {
      const mensaje = String(error?.message || '');
      if (mensaje.includes('cancel')) {
        return;
      }
      await this.mostrarDialogoErrorCamara();
    }
  }

  async pedirPermisoCamara(): Promise<boolean> {
    try {
      let estado = await Camera.checkPermissions();
      if (estado.camera !== 'granted') {
        const aviso = await this.alertController.create({
          header: 'Permiso de cámara',
          message: 'La app necesita la cámara para tomar la fotografía del registro.',
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
        estado = await Camera.requestPermissions({ permissions: ['camera', 'photos'] });
      }
      if (estado.camera !== 'granted') {
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
      header: 'Sin acceso a la cámara',
      message: 'Denegaste el permiso. Actívalo en Ajustes del teléfono, Aplicaciones, Clima GPS, Permisos, Cámara, Permitir.',
      buttons: [{ text: 'Entendido' }]
    });
    await alerta.present();
  }

  async mostrarDialogoErrorCamara() {
    const alerta = await this.alertController.create({
      header: 'No se pudo abrir la cámara',
      message: 'Revisa que diste permiso a la cámara e intenta de nuevo.',
      buttons: [{ text: 'Entendido' }]
    });
    await alerta.present();
  }

  async mostrarMensaje(texto: string) {
    const toast = await this.toastController.create({ message: texto, duration: 2000, position: 'bottom' });
    await toast.present();
  }
}
