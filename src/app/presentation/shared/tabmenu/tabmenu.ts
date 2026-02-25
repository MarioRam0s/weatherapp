import { Component, inject, input, output, signal, ViewChild } from '@angular/core';
import { ModalAlert } from '../modalAlert/modalAlert';
import { WeatherUseCase } from '../../../aplication/use-cases/weather.useCase';
import { CurrentWeather } from '../../../domain/entities/weather.entity';

export interface DataModal {
  title: string;
  description: string;
  labelButton?: string;
  showButtom?: boolean;
}

@Component({
  selector: 'shared-tabmenu',
  templateUrl: './tabmenu.html',
  imports: [ModalAlert],
})
export class Tabmenu {
  @ViewChild('tabModal') tabModal!: ModalAlert;
  currentWeatherUsecase = inject(WeatherUseCase);

  currrentWeatherList = input.required<CurrentWeather[]>();

  activeTabIndex = signal<number>(0);

  weatherActual = output<CurrentWeather>();

  dataModalDelete: DataModal = {
    title: '¡Aviso!',
    description: '¿Esta seguro de eliminar la ubicación?',
    labelButton: 'Si, eliminar',
    showButtom: true,
  };

  openModalTab(): void {
    this.tabModal.open();
  }

  deleteUbication(): void {
    this.currentWeatherUsecase.deleteWeather(this.activeTabIndex());
  }

  selectWeather(weather: CurrentWeather) {
    this.weatherActual.emit(weather);
  }
}
