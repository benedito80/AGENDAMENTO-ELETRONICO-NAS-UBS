import { Component, OnInit } from '@angular/core';
import { ModalService, TipoModal } from 'src/app/shared/modal.service';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { AdminService } from '../admin.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-list-validados',
  templateUrl: './list-validados.component.html',
  styleUrls: ['./list-validados.component.css'],
})
export class ListValidadosComponent implements OnInit {
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
    this.getValidados();
  }

  getValidados() {
    this.service.getValidados().subscribe((res: Usuario[]) => {
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
    if (confirm('Deseja marcar o usuário como atendido?')) {
      obj.atendido = true;
      this.updateUsuario(obj);
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
          'Usuário válidado com sucesso',
          2000
        );
        this.getValidados();
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
      this.getValidados();
      this.modalService.showModalPerigo(
        'UBS e Procedimento devem estar preenchidos conforme dados abaixo, caso contrário sua busca será ignorada...',
        TipoModal.INFO
      );
    } else {
      this.mostrarRelat = true;
      this.getPorUbsDetalheAtendido();
    }
  }

  getPorUbsDetalheAtendido() {
    this.service
      .getPorUbsDetSupTrue(this.paramsUbs$.trim(), this.paramsDetalhe$.trim())
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
