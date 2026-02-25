import { inject, Injectable } from '@angular/core';
import { WeatherRepository } from '../../domain/repositories/weather.repository';
import { Observable } from 'rxjs';
import { CurrentWeather } from '../../domain/entities/weather.entity';

@Injectable({ providedIn: 'root' })
export class WeatherUseCase {
  weatherRepository = inject(WeatherRepository);

  getCurrentWeatherByPostalCode(postalCode: number): Observable<CurrentWeather> {
    return this.weatherRepository.getCurrentWeatherByPostalCode(postalCode);
  }
}
