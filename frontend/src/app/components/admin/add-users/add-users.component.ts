import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService, TipoModal } from 'src/app/shared/modal.service';
import { Horas } from '../../../shared/models/horas-model';
import { USERS } from '../../../shared/models/users-model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css'],
})
export class AddUsersComponent implements OnInit {
  obj = {} as USERS;

  ubs$: any;
  porUbs$: any;
  ubsVacina$: any;
  porData$: any;
  porHr = {} as Horas;

  trocaUbs_param: any;
  trocaVacina_param: any;

  data_param: any;

  printOutros = false;
  printVacina = false;

  porHoras$: any;
  id: any;
  h: any;

  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveUsers(form: NgForm) {
    if (this.obj._id !== undefined) {
      this.service.saveUser(this.obj).subscribe(
        (success) => {
          this.modalService.showAModalSucesso('Atualizado com sucesso',2000);
          this.cleanForm(form);
          //this.location.back();
          this.router.navigate(['']);
        },
        (error) => this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO)
      );
    } else {
      this.service.saveUser(this.obj).subscribe(
        (success) => {
          this.modalService.showAModalSucesso('Usuário salvo com sucesso!',2000);
          this.cleanForm(form);
          this.router.navigate(['admin/login']);
        },
        (error) => this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO)
      );
    }
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.obj = {} as USERS;
  }

  meuCadastro(){
    this.router.navigate(['admin/login']);
  }
}
