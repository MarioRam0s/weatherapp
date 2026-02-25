export interface CurrentWeather {
  city_name: string;
  state_code: string;
  temp: number;
  rh: number;
  app_temp: number;
  sunrise: string;
  weather: Weather;
  sunset: string;
  country_code: string;
  lat: number;
  lon: number;
}

export interface Weather {
  icon: string;
  code: number;
  description: string;
}
