import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private userService: AuthService, private router: Router) {}

  login_perfil: string = 'Minha conta';
  mostrarAdmin: boolean = false;
  mostrarUser: boolean = false;
  mostrarProf: boolean = false;
  mostrarSup: boolean = false;

  ngOnInit() {
    this.verifica();
    this.reflesh();
  }

  reflesh() {
    this.userService.mostrarMenuAdminEmitter.subscribe((res) => {
      this.mostrarAdmin = res;
    });

    this.userService.mostrarMenuUserEmitter.subscribe((res) => {
      this.mostrarUser = res;
    });

    this.userService.mostrarMenuProfEmitter.subscribe((res) => {
      this.mostrarProf = res;
    });

    this.userService.mostrarMenuSupEmitter.subscribe((res) => {
      this.mostrarSup = res;
    });

    this.userService.login_perfil.subscribe((res) => {
      this.login_perfil = res;
    });
  }

  verifica() {
    if (
      this.userService.isLoggedIn() &&
      this.userService.getFuncao() == 'admin'
    ) {
      this.mostrarAdmin = true;
      this.login_perfil = 'Meu Perfil';
    }

    if (
      this.userService.isLoggedIn() &&
      this.userService.getFuncao() == 'user'
    ) {
      this.mostrarUser = true;
      this.login_perfil = 'Meu Perfil';
    }

    if (
      this.userService.isLoggedIn() &&
      this.userService.getFuncao() == 'prof'
    ) {
      this.mostrarProf = true;
      this.login_perfil = 'Meu Perfil';
    }

    if (
      this.userService.isLoggedIn() &&
      this.userService.getFuncao() == 'sup'
    ) {
      this.mostrarSup = true;
      this.login_perfil = 'Meu Perfil';
    }
  }

  onLogout() {
    this.userService.mostrarMenuAdminEmitter.emit(false);
    this.userService.mostrarMenuUserEmitter.emit(false);
    this.userService.mostrarMenuProfEmitter.emit(false);
    this.userService.mostrarMenuSupEmitter.emit(false);
    this.userService.setToken('', '', '', '');
    this.userService.login_perfil.emit('Minha conta');
    this.router.navigateByUrl('/');
  }
}
