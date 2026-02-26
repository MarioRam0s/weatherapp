import { Injectable, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentWeather, WeatherForecast } from '../entities/weather.entity';

@Injectable({ providedIn: 'root' })
export abstract class WeatherRepository {
  abstract getCurrentWeatherByPostalCode(postalCode: number): Observable<CurrentWeather>;
  abstract getWeatherForecastByPostalCode(postalCode: number): Observable<WeatherForecast>;
  abstract getAllCurrentWeather(): Signal<Record<string, CurrentWeather>>;
  abstract getAllWeatherForecast(): Signal<Record<string, WeatherForecast>>;
  abstract deleteWeather(postalCode: number): void;
}
