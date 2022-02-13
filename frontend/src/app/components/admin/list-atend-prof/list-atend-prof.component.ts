import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ModalService, TipoModal } from 'src/app/shared/modal.service';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { AdminService } from '../admin.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-list-atend-prof',
  templateUrl: './list-atend-prof.component.html',
  styleUrls: ['./list-atend-prof.component.css'],
})
export class ListAtendProfComponent implements OnInit {
  usuario = {} as Usuario;
  usuarios: any;
  data = new Date();

  p: number = 1;
  count: number = 100;

  paramsUbs$: any;
  paramsDetalhe$: any;

  mostra = false;
  mostraDiv = false;
  mostrarRelat = false;
  info: any;

  constructor(
    private service: AdminService,
    private user: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getAtendidosFalse();
  }

  getAtendidosFalse() {
    this.service.getAtendidosFalse().subscribe((res: Usuario[]) => {
      this.usuarios = res;
      this.ver(res);
    });
  }


  press() {
    if (this.mostraDiv == true) {
      this.mostraDiv = false;
    } else {
      this.mostraDiv = true;
    }
  }

  mostrarProf() {
    if (this.user.getFuncao() == 'prof') {
      return true;
    } else {
      return false;
    }
  }

  mostrarSup() {
    if (this.user.getFuncao() == 'sup') {
      return true;
    } else {
      return false;
    }
  }

  atender(obj: Usuario) {
    if (
      this.paramsUbs$ == '' ||
      this.paramsUbs$ == undefined ||
      this.paramsDetalhe$ == '' ||
      this.paramsDetalhe$ == undefined
    ) {
      this.modalService.showModalPerigo(
        'Informe uma UBS e um procedimento nos campos correspondente na forma de preservar os dados de outros estabelecimentos',
        TipoModal.INFO
      );
    } else {
      if (confirm('Deseja marcar o usuário como atendido?')) {
        obj.atendido = true;
        this.updateUsuario(obj);
      }
    }
  }

  desvalidar(obj: Usuario) {
    if (confirm('Deseja marcar o usuário como não atendido novamente?')) {
      obj.validado = false;
      obj.atendido = false;
      this.updateUsuario(obj);
    }
  }

  updateUsuario(obj: any) {
    this.service.updateUsuario(obj).subscribe(
      (success) => {
        this.modalService.showAModalSucesso(
          'Usuário atendido com sucesso',
          2000
        );
        this.muda_UbsDetalhe();
      },
      (error) =>
        this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO)
    );
  }

  muda_UbsDetalhe() {
    if (
      this.paramsUbs$ == '' ||
      this.paramsUbs$ == undefined ||
      this.paramsDetalhe$ == '' ||
      this.paramsDetalhe$ == undefined
    ) {
      this.mostrarRelat = false;
      this.modalService.showModalPerigo(
        'Informe UBS e um procedimento, caso contrário sua busca será ignorada...',
        TipoModal.INFO
      );
      this.getAtendidosFalse();
    } else {
      this.mostrarRelat = true;
      this.getPorUbsDetProfFalse();
    }
  }

  getPorUbsDetProfFalse() {
    this.service
      .getPorUbsDetProfFalse(this.paramsUbs$.trim(), this.paramsDetalhe$.trim())
      .subscribe((res: Usuario[]) => {
        this.usuarios = res;
        this.ver(res);
      });
  }

  ver(res: Usuario[]) {
    if (res.length == 0) {
      this.info = true;
    } else {
      this.info = false;
    }
  }
}
