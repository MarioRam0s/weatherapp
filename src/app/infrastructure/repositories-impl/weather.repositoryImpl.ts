import { inject, Injectable } from '@angular/core';
import { WeatherRepository } from '../../domain/repositories/weather.repository';
import { map, Observable } from 'rxjs';
import { CurrentWeather } from '../../domain/entities/weather.entity';
import { WeatherDatasource } from '../datasources/weather.datasource';
import { WeatherMapper } from '../mappers/weather.mapper';

@Injectable({ providedIn: 'root' })
export class WeatherRepositoryImpl implements WeatherRepository {
  datasourceWeather = inject(WeatherDatasource);

  getCurrentWeatherByPostalCode(postalCode: number): Observable<CurrentWeather> {
    return this.datasourceWeather
      .getCurrentWeatherByPostalCode(postalCode)
      .pipe(map((response) => WeatherMapper.fromApiCurrentWeather(response)));
  }
  getForecastWeatherByPostalCode(postalCode: number): Observable<CurrentWeather> {
    throw new Error('Method not implemented.');
  }
}
