import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { WeatherRepository } from '../../domain/repositories/weather.repository';
import { map, Observable, tap } from 'rxjs';
import { CurrentWeather } from '../../domain/entities/weather.entity';
import { WeatherDatasource } from '../datasources/weather.datasource';
import { WeatherMapper } from '../mappers/weather.mapper';

@Injectable({ providedIn: 'root' })
export class WeatherRepositoryImpl implements WeatherRepository {
  datasourceWeather = inject(WeatherDatasource);

  currentWeathers = signal<Record<string, CurrentWeather>>({});

  getCurrentWeatherByPostalCode(postalCode: number): Observable<CurrentWeather> {
    return this.datasourceWeather.getCurrentWeatherByPostalCode(postalCode).pipe(
      map((response) => WeatherMapper.fromApiCurrentWeather(response)),
      tap((item) => {
        this.currentWeathers.update((history) => ({
          ...history,
          [postalCode]: { ...item, postalCode: postalCode },
        }));
      }),
    );
  }

  getForecastWeatherByPostalCode(postalCode: number): Observable<CurrentWeather> {
    throw new Error('Method not implemented.');
  }

  getAllCurrentWeather(): Signal<Record<string, CurrentWeather>> {
    return this.currentWeathers;
  }

  deleteWeather(postalCode: number): void {
    this.currentWeathers.update((history) => {
      const { [postalCode]: deleteItem, ...rest } = history;
      console.log({ ...rest });
      return { ...rest };
    });
  }
}
