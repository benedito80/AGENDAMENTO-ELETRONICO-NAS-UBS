import { Component, OnInit } from '@angular/core';
import { ModalService, TipoModal } from 'src/app/shared/modal.service';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { AdminService } from '../admin.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-list-atendidos',
  templateUrl: './list-atendidos.component.html',
  styleUrls: ['./list-atendidos.component.css'],
})
export class ListAtendidosComponent implements OnInit {
  usuario = {} as Usuario;
  usuarios: any;

  paramsCpf$: any;

  p: number = 1;
  count: number = 25;

  cpfMask = [
    /[0-9]/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ];

  constructor(
    private service: AdminService,
    private auth: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getAtendTrue();
  }

  getAtendTrue() {
    this.service.getAtendTrue().subscribe((res: Usuario[]) => {
      this.usuarios = res;
      this.ver(res);
    });
  }

  getPorCPF() {
    this.service
      .getPorCpf(this.paramsCpf$.trim())
      .subscribe((res: Usuario[]) => {
        this.usuarios = res;
        this.ver(res);
      });
  }

  muda_Cpf() {
    if (this.paramsCpf$ == '' || this.paramsCpf$ == undefined) {
      this.getAtendTrue();
      this.modalService.showModalPerigo(
        'CPF deve estar preenchido, caso contrário sua busca será ignorada...',
        TipoModal.INFO
      );
    } else {
      this.getPorCPF();
    }
  }

  mostrarProf() {
    if (this.auth.getFuncao() == 'prof') {
      return true;
    } else {
      return false;
    }
  }

  updateUsuario(obj: any) {
    this.service.updateUsuario(obj).subscribe(
      (success) => {
        this.modalService.showAModalSucesso(
          'Usuário válidado com sucesso',
          2000
        );
        this.getAtendTrue();
      },
      (error) =>
        this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO)
    );
  }

  desfazer(obj: Usuario) {
    if (confirm('Deseja realmente voltar esse usuário para Atendimento?:')) {
      obj.atendido = false;
      this.updateUsuario(obj);
    }
  }

  info: any;
  ver(res: Usuario[]) {
    if (res.length == 0) {
      this.info = true;
    } else {
      this.info = false;
    }
  }
}
