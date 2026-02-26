import { inject, Injectable, Signal, signal } from '@angular/core';
import { WeatherRepository } from '../../domain/repositories/weather.repository';
import { map, Observable, of, tap } from 'rxjs';
import { CurrentWeather, WeatherForecast } from '../../domain/entities/weather.entity';
import { WeatherDatasource } from '../datasources/weather.datasource';
import { WeatherMapper } from '../mappers/weather.mapper';
import { LocalStoragService } from '../storage/localstorage.service';
import { CONSTANSTKEYS } from '../constants/constantsKey';

@Injectable({ providedIn: 'root' })
export class WeatherRepositoryImpl implements WeatherRepository {
  datasourceWeather = inject(WeatherDatasource);
  localStorageService = inject(LocalStoragService);

  currentWeathers = signal<Record<string, CurrentWeather>>({});

  weatherForecast = signal<Record<string, WeatherForecast>>({});

  hourExpired = signal<number>(2);

  constructor() {
    this.loadDataLocalStorage();
  }

  loadDataLocalStorage() {
    const weatherStorage = this.localStorageService.getItem(CONSTANSTKEYS.CURRENTWEATHERS);
    const forecastStorage = this.localStorageService.getItem(CONSTANSTKEYS.WEATHERFORECAST);

    const hourExpiredStorage = this.localStorageService.getItem(CONSTANSTKEYS.HOUREXPIRED);

    if (weatherStorage) {
      this.currentWeathers.set(weatherStorage as Record<string, CurrentWeather>);
    }
    if (forecastStorage) {
      this.weatherForecast.set(forecastStorage as Record<string, WeatherForecast>);
    }
    if (hourExpiredStorage) {
      this.hourExpired.set(hourExpiredStorage as number);
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
        this.localStorageService.setItem(
          CONSTANSTKEYS.CURRENTWEATHERS,
          this.currentWeathers(),
          this.hourExpired(),
        );
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

        this.localStorageService.setItem(
          CONSTANSTKEYS.WEATHERFORECAST,
          this.weatherForecast(),
          this.hourExpired(),
        );
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
    this.localStorageService.setItem(
      CONSTANSTKEYS.CURRENTWEATHERS,
      this.currentWeathers(),
      this.hourExpired(),
    );
  }

  setHourExpiredWeather(hour: number) {
    this.localStorageService.setItem(CONSTANSTKEYS.HOUREXPIRED, hour, hour);
  }

  getHourExpiredWeather(): number {
    return this.hourExpired();
  }
}
