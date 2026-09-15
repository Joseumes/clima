import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { RegistroClima } from '../../domain/weather/weather.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {
  private registros: RegistroClima[] = [];
  private contador = 1;
  private clave = 'registros_clima';

  async cargar(): Promise<void> {
    try {
      const guardado = await Preferences.get({ key: this.clave });
      if (guardado.value) {
        this.registros = JSON.parse(guardado.value);
        const maxId = this.registros.reduce((max, r) => (r.id > max ? r.id : max), 0);
        this.contador = maxId + 1;
        return;
      }
    } catch (error) {}
    try {
      const texto = localStorage.getItem(this.clave);
      if (texto) {
        this.registros = JSON.parse(texto);
        const maxId = this.registros.reduce((max, r) => (r.id > max ? r.id : max), 0);
        this.contador = maxId + 1;
      }
    } catch (error) {}
  }

  async guardar(): Promise<void> {
    try {
      await Preferences.set({ key: this.clave, value: JSON.stringify(this.registros) });
    } catch (error) {}
    try {
      localStorage.setItem(this.clave, JSON.stringify(this.registros));
    } catch (error) {}
  }

  obtenerTodos(): RegistroClima[] {
    return this.registros;
  }

  total(): number {
    return this.registros.length;
  }

  async agregar(datos: Omit<RegistroClima, 'id' | 'fecha' | 'foto'>): Promise<RegistroClima> {
    const nuevo: RegistroClima = {
      id: this.contador++,
      fecha: new Date().toLocaleString('es-GT'),
      foto: null,
      ...datos
    };
    this.registros.push(nuevo);
    await this.guardar();
    return nuevo;
  }

  async actualizarFoto(id: number, foto: string): Promise<void> {
    const registro = this.registros.find(r => r.id === id);
    if (registro) {
      registro.foto = foto;
      await this.guardar();
    }
  }
}
