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

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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
    IonInput,
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

  // Datos del formulario
  datos = {
    nombre: '',
    edad: null,
    condicion: '',
    comentario: '',
    fotoId: ''
  };

  // Aquí aparecerá el JSON
  jsonResultado = '';
json: any;

  // Abrir cámara
  async tomarFoto() {
  try {
    const foto = await Camera.getPhoto({
      quality: 70,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri
    });

    // Solo guardamos un identificador
    this.datos.fotoId = 'FOTO-' + Date.now();

    console.log('Foto tomada');
    console.log('ID:', this.datos.fotoId);

  } catch (error) {
    console.log('No se tomó la fotografía');
  }
}

  // Guardar información
  guardar() {

    const json = {
      nombre: this.datos.nombre,
      edad: this.datos.edad,
      condicion: this.datos.condicion,
      comentario: this.datos.comentario,
      fotografia: this.datos.fotoId
    };

    // Convertir a JSON
    this.jsonResultado = JSON.stringify(json, null, 2);

    console.log(json);
  }

}