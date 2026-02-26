import { Component, inject, signal, ViewChild, effect } from '@angular/core';
import { Tabmenu } from '../../shared/tabmenu/tabmenu';
import { ModalAlert } from '../../shared/modalAlert/modalAlert';
import { PostalCodeUseCase } from '../../../aplication/use-cases/postalCode.useCase';
import { PostalCode } from '../../../domain/entities/postalCode.entity';
import { WeatherUseCase } from '../../../aplication/use-cases/weather.useCase';
import { CurrentWeather } from '../../../domain/entities/weather.entity';
import { Router } from '@angular/router';

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
})
export class Ubications {
  private servicePostalCode = inject(PostalCodeUseCase);
  private serviceWeather = inject(WeatherUseCase);
  private routerService = inject(Router);

  ubication = signal<PostalCode | null>(null);

  currentWeatherList = signal<CurrentWeather[]>([]);

  currentWeather = signal<CurrentWeather | null>(null);

  showAlert = signal<boolean>(false);

  infoAlertModal = signal<DataModal | null>(null);

  @ViewChild('addModal') addModal!: ModalAlert;
  @ViewChild('alertModal') alertModal!: ModalAlert;

  constructor() {
    if (Object.values(this.serviceWeather.getAllCurrentWeather()()).length > 0) {
      this.currentWeather.set(Object.values(this.serviceWeather.getAllCurrentWeather()())[0]);
    }
  }

  private logEffect = effect(() => {
    if (Object.values(this.serviceWeather.getAllCurrentWeather()()).length == 1) {
      this.currentWeather.set(Object.values(this.serviceWeather.getAllCurrentWeather()())[0]);
    }
  });

  private syncWeatherEffect = effect(() => {
    const data = this.serviceWeather.getAllCurrentWeather()();
    const dataList = Object.values(data);

    this.currentWeatherList.set(dataList);

    const existPostalCode = dataList.filter(
      (item) => item.postalCode == this.currentWeather()?.postalCode,
    );

    if (existPostalCode.length == 0) {
      this.currentWeather.set(null);
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
    description: 'Ocurrio un error inesperado',
  };

  openModal() {
    this.addModal.open();
  }

  addUbication(postalCode: number) {
    if (this.currentWeatherList().find((item) => item.postalCode === postalCode)) {
      this.showAlert.set(true);
      setTimeout(() => {
        this.showAlert.set(false);
      }, 2000);
      return;
    }
    this.serviceWeather.getCurrentWeatherByPostalCode(postalCode).subscribe({
      error: (err) => {
        this.infoAlertModal.set({
          title: '¡Error!',
          description: err,
        });
        this.alertModal.open();
      },
      complete: () => {
        this.infoAlertModal.set({
          title: '¡Agregado!',
          description: 'Se agrego con exito a la lista',
        });
        this.alertModal.open();
      },
    });
  }

  searchUbicationByPostalCode(postalCode: number) {
    this.servicePostalCode.getUbicationByPostalCode(postalCode).subscribe({
      next: (response) => {
        this.ubication.set(response);
      },
      error: (err) => {
        this.infoAlertModal.set({
          title: '¡Error!',
          description: err,
        });
        this.alertModal.open();
      },
      complete: () => {
        if (!this.ubication()) {
          this.infoAlertModal.set({
            title: '¡Sin datos!',
            description: `No se encontro informacion con el código postal ${postalCode}`,
          });
          this.alertModal.open();
        }
      },
    });
  }

  weatherActual(weather: CurrentWeather) {
    this.currentWeather.set(weather);
  }

  redirectToForecast() {
    this.routerService.navigate(['/forecast', this.currentWeather()?.postalCode]);
  }
}
