import { Component, computed, inject, signal, ViewChild, effect } from '@angular/core';
import { Tabmenu } from '../../shared/tabmenu/tabmenu';
import { ModalAlert } from '../../shared/modalAlert/modalAlert';
import { PostalCodeUseCase } from '../../../aplication/use-cases/postalCode.useCase';
import { PostalCode } from '../../../domain/entities/postalCode.entity';
import { WeatherUseCase } from '../../../aplication/use-cases/weather.useCase';
import { CurrentWeather } from '../../../domain/entities/weather.entity';

export interface DataModal {
  title: string;
  description: string;
  labelButton?: string;
  showButtom?: boolean;
}

@Component({
  selector: 'app-ubications',
  imports: [Tabmenu, ModalAlert],
  templateUrl: './ubications.html',
  styleUrl: './ubications.css',
})
export class Ubications {
  private servicePostalCode = inject(PostalCodeUseCase);
  private serviceWeather = inject(WeatherUseCase);

  ubication = signal<PostalCode | null>(null);

  currentWeatherList = computed(() => Object.values(this.serviceWeather.getAllCurrentWeather()()));

  currentWeather = signal<CurrentWeather | null>(null);

  @ViewChild('alertModal') alertModal!: ModalAlert;

  private logEffect = effect(() => {
    if (Object.values(this.serviceWeather.getAllCurrentWeather()()).length == 1) {
      this.currentWeather.set(Object.values(this.serviceWeather.getAllCurrentWeather()())[0]);
    }
  });

  dataModalAdd: DataModal = {
    title: '¡Aviso!',
    description: '¿Esta seguro de agregar la ubicación?',
    labelButton: 'Si, agregar',
    showButtom: true,
  };

  dataModalError: DataModal = {
    title: 'Error!',
    description: 'Ocurrio un error inesoerado',
  };

  dataModalConfirm: DataModal = {
    title: 'Agregado!',
    description: 'Se agrego con exito a la lista',
  };

  openModal() {
    this.alertModal.open();
  }

  addUbication(postalCode: number) {
    this.serviceWeather.getCurrentWeatherByPostalCode(postalCode).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error('Error:', err);
      },
      complete: () => {
        console.log('Petición completada');
      },
    });
  }

  searchUbicationByPostalCode(postalCode: number) {
    this.servicePostalCode.getUbicationByPostalCode(postalCode).subscribe({
      next: (response) => {
        this.ubication.set(response);
      },
      error: (err) => {
        console.error('Error:', err);
      },
      complete: () => {
        console.log('Petición completada');
      },
    });
  }

  weatherActual(weather: CurrentWeather) {
    this.currentWeather.set(weather);
  }
}
