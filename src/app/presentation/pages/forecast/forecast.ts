import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, effect, inject, signal, ViewChild } from '@angular/core';
import { WeatherUseCase } from '../../../aplication/use-cases/weather.useCase';
import { WeatherForecast } from '../../../domain/entities/weather.entity';
import { ModalAlert } from '../../shared/modalAlert/modalAlert';
import { DatePipe } from '@angular/common';

export interface DataModal {
  title: string;
  description: string;
  labelButton?: string;
  showButtom?: boolean;
}

@Component({
  selector: 'app-forecast',
  imports: [ModalAlert, DatePipe],
  templateUrl: './forecast.html',
})
export class Forecast implements AfterViewInit {
  weatherService = inject(WeatherUseCase);
  route = inject(ActivatedRoute);

  @ViewChild('alertModal') alertModal!: ModalAlert;

  infoAlertModal = signal<DataModal | null>({
    title: '',
    description: '',
  });

  weatherForecast = signal<WeatherForecast | null>(null);

  ngAfterViewInit(): void {
    const stateCode = this.route.snapshot.paramMap.get('stateCode');

    this.weatherService.getWeatherForecastByPostalCode(+stateCode!).subscribe({
      next: (response) => {},
      error: (err) => {
        this.infoAlertModal.set({
          title: '¡Error!',
          description: err.error.error,
        });
        this.alertModal.open();
      },
      complete: () => {
        this.infoAlertModal.set({
          title: '¡Listo!',
          description: 'Petición realizada con exito',
        });
        this.alertModal.open();
      },
    });
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
