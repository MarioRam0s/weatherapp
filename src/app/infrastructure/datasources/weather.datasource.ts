import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CurrentWeather, WeatherForecast } from '../../domain/entities/weather.entity';

@Injectable({ providedIn: 'root' })
export class WeatherDatasource {
  http = inject(HttpClient);

  getCurrentWeatherByPostalCode(postalCode: number): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(
      `https://api.weatherbit.io/v2.0/current?&postal_code=${postalCode}&country=US&lang=es&key=2d43976916c34beea54429749d8257d8`,
    );
  }

  getWeatherForecastByPostalCode(postalCode: number): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>(
      `https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${postalCode}&days=5&lang=es&key=2d43976916c34beea54429749d8257d8`,
    );
  }
}
