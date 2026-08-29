import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonList,
  IonListHeader,
  IonLabel,
  IonRadio,
  IonRadioGroup
} from '@ionic/angular/standalone';

import {
  Camera,
  CameraResultType,
  CameraSource
} from '@capacitor/camera';

@Component({
  selector: 'app-clima-fotografia',
  templateUrl: './clima-fotografia.page.html',
  styleUrls: ['./clima-fotografia.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonTextarea,
    IonButton,
    IonList,
    IonListHeader,
    IonLabel,
    IonRadio,
    IonRadioGroup
  ]
})
export class ClimaFotografiaPage {

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

      // Solicitar permisos de cámara
      const permisos = await Camera.checkPermissions();

      if (permisos.camera !== 'granted') {
        const nuevosPermisos = await Camera.requestPermissions({
          permissions: ['camera']
        });

        if (nuevosPermisos.camera !== 'granted') {
          console.log('Permiso de cámara denegado');
          return;
        }
      }

      // Abrir cámara
      const foto = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Uri
      });

      // Verificar que se haya obtenido la fotografía
      if (foto.webPath) {

        // Guardar la URL de la fotografía
        this.datos.fotoUrl = foto.webPath;

        // Crear ID único para la fotografía
        this.datos.fotoId = 'FOTO-' + Date.now();

        console.log('Fotografía tomada correctamente');
        console.log('ID:', this.datos.fotoId);
        console.log('URL:', this.datos.fotoUrl);
      }

    } catch (error) {

      console.error('Error al abrir la cámara:', error);

    }
  }

  guardarJson() {

    const json = {
      nombre: this.datos.nombre,
      edad: this.datos.edad,
      condicion: this.datos.condicion,
      comentario: this.datos.comentario,
      fotografia: {
        id: this.datos.fotoId,
        url: this.datos.fotoUrl
      }
    };

    console.log('JSON:', json);

    this.guardado = true;
  }
}
