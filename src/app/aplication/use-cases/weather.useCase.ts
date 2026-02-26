import { inject, Injectable } from '@angular/core';
import { WeatherRepository } from '../../domain/repositories/weather.repository';
import { Observable } from 'rxjs';
import { CurrentWeather, WeatherForecast } from '../../domain/entities/weather.entity';

@Injectable({ providedIn: 'root' })
export class WeatherUseCase {
  weatherRepository = inject(WeatherRepository);

  getCurrentWeatherByPostalCode(postalCode: number): Observable<CurrentWeather> {
    return this.weatherRepository.getCurrentWeatherByPostalCode(postalCode);
  }

  getWeatherForecastByPostalCode(postalCode: number): Observable<WeatherForecast> {
    return this.weatherRepository.getWeatherForecastByPostalCode(postalCode);
  }

  getAllCurrentWeather() {
    return this.weatherRepository.getAllCurrentWeather();
  }

  getAllWeatherForecast() {
    return this.weatherRepository.getAllWeatherForecast();
  }

  deleteWeather(postalCode: number) {
    return this.weatherRepository.deleteWeather(postalCode);
  }
}
