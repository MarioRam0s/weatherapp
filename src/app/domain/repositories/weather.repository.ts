import { Injectable, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentWeather } from '../entities/weather.entity';

@Injectable({ providedIn: 'root' })
export abstract class WeatherRepository {
  abstract getCurrentWeatherByPostalCode(postalCode: number): Observable<CurrentWeather>;
  abstract getForecastWeatherByPostalCode(postalCode: number): Observable<CurrentWeather>;
  abstract getAllCurrentWeather(): Signal<Record<string, CurrentWeather>>;
  abstract deleteWeather(postalCode: number): void;
}
