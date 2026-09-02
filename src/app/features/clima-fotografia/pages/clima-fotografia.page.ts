import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem,
  IonTextarea, IonButton, IonList, IonListHeader,
  IonLabel, IonRadio, IonRadioGroup
} from '@ionic/angular/standalone';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-clima-fotografia',
  templateUrl: './clima-fotografia.page.html',
  styleUrls: ['./clima-fotografia.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem,
    IonTextarea, IonButton, IonList, IonListHeader,
    IonLabel, IonRadio, IonRadioGroup
  ]
})
export class ClimaFotografiaPage {
  private router = inject(Router);

  goToWeather() {
    this.router.navigate(['/home']);
  }

  datos = {
    nombre: '',
    edad: null as number | null,
    condicion: '',
    comentario: '',
    fotoId: '',
    fotoUrl: ''
  };

  guardado = false;

  async tomarFoto() {
    try {
      const permisos = await Camera.checkPermissions();
      if (permisos.camera !== 'granted') {
        const nuevosPermisos = await Camera.requestPermissions({ permissions: ['camera'] });
        if (nuevosPermisos.camera !== 'granted') {
          console.log('Permiso de camara denegado');
          return;
        }
      }

      const foto = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Uri
      });

      if (foto.webPath) {
        this.datos.fotoUrl = foto.webPath;
        this.datos.fotoId = 'FOTO-' + Date.now();
        console.log('Fotografia tomada correctamente');
        console.log('ID:', this.datos.fotoId);
        console.log('URL:', this.datos.fotoUrl);
      }
    } catch (error) {
      console.error('Error al abrir la camara:', error);
    }
  }

  guardarJson() {
    const json = {
      nombre: this.datos.nombre,
      edad: this.datos.edad,
      condicion: this.datos.condicion,
      comentario: this.datos.comentario,
      fotografia: { id: this.datos.fotoId, url: this.datos.fotoUrl }
    };
    console.log('JSON:', json);
    this.guardado = true;
  }
}
