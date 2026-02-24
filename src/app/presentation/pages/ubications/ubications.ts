import { Component, ViewChild } from '@angular/core';
import { Tabmenu } from '../../shared/tabmenu/tabmenu';
import { ModalAlert } from '../../shared/modalAlert/modalAlert';

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
  @ViewChild('alertModal') alertModal!: ModalAlert;

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

  addUbication() {
    console.log('agregando ubicacion');
  }
}
