import { CurrentWeather } from './../../domain/entities/weather.entity';
export class WeatherMapper {
  static fromApiCurrentWeather(currentWeather: any): CurrentWeather {
    return {
      city_name: currentWeather.data[0].city_name,
      state_code: currentWeather.data[0].state_code,
      temp: currentWeather.data[0].temp,
      rh: currentWeather.data[0].rh,
      app_temp: currentWeather.data[0].app_temp,
      sunrise: currentWeather.data[0].sunrise,
      weather: currentWeather.data[0].weather,
      sunset: currentWeather.data[0].sunset,
      country_code: currentWeather.data[0].country_code,
      lat: currentWeather.data[0].lat,
      lon: currentWeather.data[0].lon,
    };
  }
}
