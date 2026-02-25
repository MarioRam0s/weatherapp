import { computed, inject, Injectable, signal } from '@angular/core';
import { WeatherRepository } from '../../domain/repositories/weather.repository';
import { map, Observable, tap } from 'rxjs';
import { CurrentWeather } from '../../domain/entities/weather.entity';
import { WeatherDatasource } from '../datasources/weather.datasource';
import { WeatherMapper } from '../mappers/weather.mapper';

@Injectable({ providedIn: 'root' })
export class WeatherRepositoryImpl implements WeatherRepository {
  datasourceWeather = inject(WeatherDatasource);

  currentWeathers = signal<Record<string, CurrentWeather>>({});
  currentWeathersKeys = computed(() => Object.keys(this.currentWeathers()));

  getCurrentWeatherByPostalCode(postalCode: number): Observable<CurrentWeather> {
    return this.datasourceWeather.getCurrentWeatherByPostalCode(postalCode).pipe(
      map((response) => WeatherMapper.fromApiCurrentWeather(response)),
      tap((item) => {
        this.currentWeathers.update((history) => ({
          ...history,
          [item.state_code]: item,
        }));
      }),
    );
  }

  getForecastWeatherByPostalCode(postalCode: number): Observable<CurrentWeather> {
    throw new Error('Method not implemented.');
  }

  getAllCurrentWeather(): Record<number, CurrentWeather> {
    return this.currentWeathers();
  }
}
