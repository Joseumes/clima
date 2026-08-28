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

  datos = {
    nombre: '',
    edad: null,
    condicion: '',
    comentario: '',
    fotoId: ''
  };

  guardado = false;


  async tomarFoto() {

    try {

      await Camera.getPhoto({
        quality: 70,
        source: CameraSource.Camera,
        resultType: CameraResultType.Uri
      });

      // ID de la fotografía
      this.datos.fotoId = 'FOTO-' + Date.now();

    } catch (error) {

      console.log('No se tomó la fotografía');

    }

  }


  guardarJson() {

    const json = {
      nombre: this.datos.nombre,
      edad: this.datos.edad,
      condicion: this.datos.condicion,
      comentario: this.datos.comentario,
      fotografia: this.datos.fotoId
    };

    // Este JSON queda listo para enviarlo posteriormente por POST
    console.log('JSON:', json);

    // Mostrar los datos en pantalla
    this.guardado = true;

  }

}