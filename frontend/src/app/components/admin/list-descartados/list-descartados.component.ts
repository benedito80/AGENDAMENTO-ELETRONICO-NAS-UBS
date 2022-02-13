import { Component, OnInit } from '@angular/core';
import { ModalService, TipoModal } from 'src/app/shared/modal.service';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-list-descartados',
  templateUrl: './list-descartados.component.html',
  styleUrls: ['./list-descartados.component.css'],
})
export class ListDescartadosComponent implements OnInit {
  usuario = {} as Usuario;
  usuarios: any;

  p: number = 1;
  count: number = 25;

  constructor(
    private service: AdminService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getValidadosDescartados();
  }

  getValidadosDescartados() {
    this.service.getValidadosDescartados().subscribe((res: Usuario[]) => {
      this.usuarios = res;
      this.ver(res);
    });
  }

  updateUsuario(obj: any) {
    this.service.updateUsuario(obj).subscribe(
      (success) => {
        this.modalService.showAModalSucesso(
          'Usuário válidado com sucesso',
          2000
        );
        this.getValidadosDescartados();
      },
      (error) =>
        this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO)
    );
  }

  desfazer(obj: Usuario) {
    if (confirm('Deseja realmente voltar esse usuário para Atendimento?:')) {
      obj.validado = false;
      obj.descartado = false;
      this.updateUsuario(obj);
    }
  }

  excluir(obj: Usuario) {
    if (confirm('Deseja realmente excluir o usuario?')) {
      this.service.deleteUsuario(obj).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(
            'Usuario excluido com sucesso!',
            2000
          );
          this.getValidadosDescartados();
        },
        (error) => {
          this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO);
        }
      );
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
