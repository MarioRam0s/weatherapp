import { ActivatedRoute } from '@angular/router';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { WeatherUseCase } from '../../../aplication/use-cases/weather.useCase';
import { WeatherForecast } from '../../../domain/entities/weather.entity';

@Component({
  selector: 'app-forecast',
  imports: [],
  templateUrl: './forecast.html',
})
export class Forecast implements OnInit {
  weatherService = inject(WeatherUseCase);
  route = inject(ActivatedRoute);

  weatherForecast = signal<WeatherForecast | null>(null);

  ngOnInit(): void {
    const stateCode = this.route.snapshot.paramMap.get('stateCode');

    this.weatherService
      .getWeatherForecastByPostalCode(+stateCode!)
      .subscribe((response) => console.log(response));
  }

  private logEffect = effect(() => {
    const stateCode = this.route.snapshot.paramMap.get('stateCode');
    this.weatherForecast.set(
      Object.values(this.weatherService.getAllWeatherForecast()()).find(
        (item) => item.postalCode == +stateCode!,
      ) ?? null,
    );
  });
}
