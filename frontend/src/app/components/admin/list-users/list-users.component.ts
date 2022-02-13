import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalService, TipoModal } from 'src/app/shared/modal.service';
import { AdminService } from '../admin.service';
import { USERS } from '../../../shared/models/users-model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  user = {} as USERS;
  users: any;
  p: Number = 1;
  count: Number = 25;

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
    private userService: AdminService,
    private alertService: ModalService
  ) {}

  ngOnInit() {
    this.getUser();
  }


  getUser() {
    this.userService.getUsers().subscribe((res: USERS[]) => {
      this.users = res;
    });
  }


  saveUser(form: NgForm) {
    let msgSuccess = 'Usuário cadastrado com sucesso!';
    let msgError = 'Erro ao cadastrar usuário, tente novamente!';

    if (this.user._id !== undefined) {
      msgSuccess = 'Usuário atualizado com sucesso!';
      msgError = 'Erro ao atualizar usuário, tente novamente!';

      this.userService.updateUser(this.user).subscribe(
        (success) => {
          this.alertService.showAModalSucesso(msgSuccess, 2000);
          this.cleanForm(form);
          //this.location.back();
        },
        (error) => this.alertService.showModalPerigo(msgError, TipoModal.PERIGO)
      );
    } else {
      this.userService.saveUser(this.user).subscribe(
        (success) => {
          this.alertService.showAModalSucesso(msgSuccess, 2000);
          this.cleanForm(form);
        },
        (error) => this.alertService.showModalPerigo(msgError, TipoModal.PERIGO)
      );
    }
  }


  editUser(user: any) {
    this.user = { ...user };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getUser();
    form.resetForm();
    this.user = {} as any;
  }

  //confirma a exclusão
  del(user: USERS) {
    if (confirm('Deseja remover usuário?')) {
      this.userService.deleteUser(user).subscribe(
        (success) => {
          this.alertService.showAModalSucesso(
            'Usuário removido com sucesso!',
            2000
          );
          this.getUser();
          this.user = {} as any;
        },
        (errors) => {
          this.alertService.showModalPerigo(
            'Erro ao remover curso. Tente novamente mais tarde.',
            TipoModal.INFO
          );
        }
      );
    }
  }
}
