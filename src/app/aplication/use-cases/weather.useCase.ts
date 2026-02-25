import { computed, inject, Injectable, signal } from '@angular/core';
import { WeatherRepository } from '../../domain/repositories/weather.repository';
import { Observable, tap } from 'rxjs';
import { CurrentWeather } from '../../domain/entities/weather.entity';
import { LocalStoragService } from '../../infrastructure/storage/localstorage.service';

@Injectable({ providedIn: 'root' })
export class WeatherUseCase {
  weatherRepository = inject(WeatherRepository);
  localStorage = inject(LocalStoragService);

  getCurrentWeatherByPostalCode(postalCode: number): Observable<CurrentWeather> {
    return this.weatherRepository.getCurrentWeatherByPostalCode(postalCode).pipe(
      tap((response) => {
        this.localStorage.setItem('currentWeather', response);
      }),
    );
  }

  getAllCurrentWeather() {
    return this.weatherRepository.getAllCurrentWeather();
  }
}
