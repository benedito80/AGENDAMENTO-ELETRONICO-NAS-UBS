import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService, TipoModal } from 'src/app/shared/modal.service';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-not-atendido',
  templateUrl: './new-agendados.component.html',
  styleUrls: ['./new-agendados.component.css'],
})
export class NewAgendadosComponent implements OnInit {
  usuario = {} as Usuario;
  usuarios: any;
  info: any;

  paramsUbs$: any;
  paramsDetalhe$: any;

  p: number = 1;
  count: number = 25;

  constructor(
    private service: AdminService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.service.getUsuarios().subscribe((res: Usuario[]) => {
      this.usuarios = res;
      this.ver(res);
    });
  }

  getPorUbsDetSupFalse() {
    this.service
      .getPorUbsDetSupFalse(this.paramsUbs$.trim(), this.paramsDetalhe$.trim())
      .subscribe((res: Usuario[]) => {
        this.usuarios = res;
        this.ver(res);
      });
  }

  atendidos() {
    this.router.navigate(['admin/atendidos-true']);
  }

  listAtendidos() {
    this.router.navigate(['admin/validados']);
  }

  listDescartados() {
    this.router.navigate(['admin/descartados']);
  }

  muda_UbsDetalhe() {
    if (
      this.paramsUbs$ == '' ||
      this.paramsUbs$ == undefined ||
      this.paramsDetalhe$ == '' ||
      this.paramsDetalhe$ == undefined
    ) {
      this.modalService.showModalPerigo(
        'Informe UBS e um procedimento, caso contrário sua busca será ignorada...',
        TipoModal.INFO
      );
      this.getUsuarios();
    } else {
      this.getPorUbsDetSupFalse();
    }
  }

  ver(res: Usuario[]) {
    if (res.length == 0) {
      this.info = true;
    } else {
      this.info = false;
    }
  }

  validar(obj: Usuario) {
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
      if (confirm('Deseja realmente marcar como Válido:')) {
        obj.validado = true;
        this.updateUsuario(obj);
      }
    }
  }

  descartar(obj: Usuario) {
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
      if (confirm('Deseja realmente marcar como Descartado:')) {
        obj.validado = true;
        obj.descartado = true;
        this.updateUsuario(obj);
      }
    }
  }

  updateUsuario(obj: any) {
    this.service.updateUsuario(obj).subscribe(
      (success) => {
        this.modalService.showAModalSucesso('Atualizado com sucesso', 2000);
        this.muda_UbsDetalhe();
      },
      (error) =>
        this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO)
    );
  }
}
