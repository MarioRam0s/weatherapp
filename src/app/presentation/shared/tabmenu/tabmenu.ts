import { Component, ViewChild } from '@angular/core';
import { ModalAlert } from '../modalAlert/modalAlert';

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
    console.log('Eliminando ubicación');
  }
}
