import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
})
export class FormLoginComponent implements OnInit {
  constructor(private userService: AuthService, private router: Router) {}

  model = {
    email: '',
    password: '',
  };
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string = '';

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      if (this.userService.funcao == 'admin') {
        this.router.navigateByUrl('/admin/form');
      }
      if (this.userService.funcao == 'prof') {
        this.router.navigateByUrl('/admin/atendidos-false');
      }
      if (this.userService.funcao == 'sup') {
        this.router.navigateByUrl('/admin/new-usuarios');
      }
    }
  }

  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      (res: any) => {
        this.userService.setToken(
          res['token'], res['user'], res['funcao'], res['email']
        );
        // this.router.navigateByUrl('/admin/new-usuarios');

        if (this.userService.funcao == 'admin') {
          this.userService.mostrarMenuAdminEmitter.emit(true);
          this.router.navigateByUrl('/admin/form');
        }

        if (this.userService.funcao == 'prof') {
          this.userService.mostrarMenuProfEmitter.emit(true);
          this.router.navigateByUrl('/admin/atendidos-false');
        }

        if (this.userService.funcao == 'sup') {
          this.userService.mostrarMenuSupEmitter.emit(true);
          this.router.navigateByUrl('/admin/new-usuarios');
        }

        this.userService.login_perfil.emit('Meu Perfil');
      },
      (err) => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  limpar(form: NgForm) {
    form.reset();
  }

  cadCliente(){
    this.router.navigateByUrl('/admin/add');
  }
}
