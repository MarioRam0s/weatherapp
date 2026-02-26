import { CurrentWeather, WeatherForecast } from './../../domain/entities/weather.entity';
export class WeatherMapper {
  static fromApiCurrentWeather(currentWeather: any): CurrentWeather {
    return {
      city_name: currentWeather.data[0].city_name,
      state_code: currentWeather.data[0].state_code,
      temp: currentWeather.data[0].temp,
      rh: currentWeather.data[0].rh,
      sunrise: currentWeather.data[0].sunrise,
      weather: currentWeather.data[0].weather,
      sunset: currentWeather.data[0].sunset,
      country_code: currentWeather.data[0].country_code,
      lat: currentWeather.data[0].lat,
      lon: currentWeather.data[0].lon,
    };
  }

  static fromApiWeatherForecast(forecastWeather: any): WeatherForecast {
    return {
      timezone: forecastWeather.timezone,
      city_name: forecastWeather.city_name,
      state_code: forecastWeather.state_code,
      lat: forecastWeather.lat,
      lon: forecastWeather.lon,
      country_code: forecastWeather.country_code,
      data: forecastWeather.data.map((item: any) => ({
        valid_date: item.valid_date,
        datetime: item.datetime,
        temp: item.temp,
        rh: item.rh,
        weather: item.weather,
        sunrise_ts: item.sunrise_ts,
        sunset_ts: item.sunset_ts,
      })),
    };
  }
}
