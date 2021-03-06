import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum TipoModal {
  PERIGO = 'danger',
  INFO = 'info',
  SUCESSO = 'success',
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private service: BsModalService) {}

  //  METODO 00
  private showModal(mgs: string, tipo: TipoModal, tempoLimite?: number) {
    const resultado: BsModalRef = this.service.show(AlertModalComponent);
    resultado.content.type = tipo;
    resultado.content.message = mgs;

    if (tempoLimite) {
      setTimeout(() => resultado.hide(), tempoLimite);
    }
  }

  //  METODO 02
  showModalPerigo(message: string, tipo: TipoModal) {
    this.showModal(message, tipo);
  }

  //  METODO 03
  showAModalSucesso(message: string, tempo: number) {
    this.showModal(message, TipoModal.SUCESSO, tempo);
  }

  //  METODO 04
  showConfirm(titulo: string, msg: string, okTxt?: string, cancelTxt?: string) {
    const resultado: BsModalRef = this.service.show(ConfirmModalComponent);
    resultado.content.title = titulo;
    resultado.content.msg = msg;

    if (okTxt) {
      resultado.content.okTxt = okTxt;
    }

    if (cancelTxt) {
      resultado.content.cancelTxt = cancelTxt;
    }

    return (<ConfirmModalComponent>resultado.content).confirmaResultado;
  }
}
