import { inject, Injectable, Signal, signal } from '@angular/core';
import { WeatherRepository } from '../../domain/repositories/weather.repository';
import { map, Observable, of, tap } from 'rxjs';
import { CurrentWeather, WeatherForecast } from '../../domain/entities/weather.entity';
import { WeatherDatasource } from '../datasources/weather.datasource';
import { WeatherMapper } from '../mappers/weather.mapper';
import { LocalStoragService } from '../storage/localstorage.service';

@Injectable({ providedIn: 'root' })
export class WeatherRepositoryImpl implements WeatherRepository {
  datasourceWeather = inject(WeatherDatasource);
  localStorageService = inject(LocalStoragService);

  currentWeathers = signal<Record<string, CurrentWeather>>({});

  weatherForecast = signal<Record<string, WeatherForecast>>({});

  constructor() {
    this.loadDataLocalStorage();
  }

  loadDataLocalStorage() {
    const weatherStorage = this.localStorageService.getItem('currentWeathers');
    const forecastStorage = this.localStorageService.getItem('weatherForecast');

    if (weatherStorage) {
      this.currentWeathers.set(weatherStorage as Record<string, CurrentWeather>);
    }
    if (forecastStorage) {
      this.weatherForecast.set(forecastStorage as Record<string, WeatherForecast>);
    }
  }

  getCurrentWeatherByPostalCode(postalCode: number): Observable<CurrentWeather> {
    return this.datasourceWeather.getCurrentWeatherByPostalCode(postalCode).pipe(
      map((response) => WeatherMapper.fromApiCurrentWeather(response)),
      tap((item) => {
        this.currentWeathers.update((history) => ({
          ...history,
          [postalCode]: { ...item, postalCode: postalCode },
        }));
        this.localStorageService.setItem('currentWeathers', this.currentWeathers());
      }),
    );
  }

  getWeatherForecastByPostalCode(postalCode: number): Observable<WeatherForecast> {
    const existPostalCode = this.weatherForecast()[postalCode];
    if (existPostalCode) return of(existPostalCode);

    return this.datasourceWeather.getWeatherForecastByPostalCode(postalCode).pipe(
      map((response) => WeatherMapper.fromApiWeatherForecast(response)),
      tap((item) => {
        this.weatherForecast.update((history) => ({
          ...history,
          [postalCode]: { ...item, postalCode: postalCode },
        }));

        this.localStorageService.setItem('weatherForecast', this.weatherForecast());
      }),
    );
  }

  getAllCurrentWeather(): Signal<Record<string, CurrentWeather>> {
    return this.currentWeathers;
  }

  getAllWeatherForecast(): Signal<Record<string, WeatherForecast>> {
    return this.weatherForecast;
  }

  deleteWeather(postalCode: number): void {
    this.currentWeathers.update((history) => {
      const { [postalCode]: deleteItem, ...rest } = history;
      return { ...rest };
    });
    this.localStorageService.setItem('currentWeathers', this.currentWeathers());
  }
}
