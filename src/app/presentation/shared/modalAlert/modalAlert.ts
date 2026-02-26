import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';

export interface DataModal {
  title: string;
  description: string;
  labelButton?: string;
  showButtom?: boolean;
}

@Component({
  selector: 'shared-modal',
  templateUrl: './modalAlert.html',
})
export class ModalAlert {
  @ViewChild('modalRef') modalElement!: ElementRef;

  private modalInstance!: Modal;

  dataModal = input.required<DataModal>();
  eventConfirm = output<void>();

  ngAfterViewInit(): void {
    this.modalInstance = new Modal(this.modalElement.nativeElement);
  }

  open(): void {
    this.modalInstance.show();
  }

  close(): void {
    this.modalInstance.hide();
  }

  onConfirm(): void {
    this.eventConfirm.emit();
    this.close();
  }
}
