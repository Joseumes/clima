export interface Pais {
  nombre: string;
  capital: string;
  lat: number;
  lon: number;
}

export interface WeatherResponse {
  current: CurrentWeather;
}

export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  wind_speed_10m: number;
  weather_code: number;
}
