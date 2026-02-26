export interface InfoBasicWeather {
  city_name: string;
  state_code: string;
  postalCode?: number;
  lat: number;
  lon: number;
  country_code: string;
}

export interface CurrentWeather extends InfoBasicWeather {
  temp: number;
  rh: number;
  sunrise: string;
  weather: Weather;
  sunset: string;
}

export interface WeatherForecast extends InfoBasicWeather {
  timezone: string;
  data: Forecast[];
}

export interface Forecast {
  valid_date: Date;
  datetime: string;
  temp: number;
  rh: number;
  weather: Weather;
  sunrise_ts: number;
  sunset_ts: number;
}

export interface Weather {
  icon: string;
  code: number;
  description: string;
}
