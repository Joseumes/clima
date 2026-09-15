export interface CurrentWeather {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
}

export interface WeatherResponse {
  current: CurrentWeather;
}

export interface RegistroClima {
  id: number;
  fecha: string;
  latitud: number;
  longitud: number;
  temperatura: number;
  sensacion: number;
  humedad: number;
  viento: number;
  foto: string | null;
}
