import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };
  token: string = '';
  user: string = '';
  funcao: string = '';
  email: string = '';

  mostrarMenuAdminEmitter = new EventEmitter<boolean>();
  mostrarMenuUserEmitter = new EventEmitter<boolean>();
  mostrarMenuProfEmitter = new EventEmitter<boolean>();
  mostrarMenuSupEmitter = new EventEmitter<boolean>();

  login_perfil = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  //METODO 01
  login(authCredentials: any) {
    return this.http.post(
      environment.API + '/users/authenticate',
      authCredentials,
      this.noAuthHeader
    );
  }

  //METODO 02
  getUserProfile(id: any) {
    return this.http.get(environment.API + `users/user/${id}`);
  }

  //METODO 03
  setToken(token: string, user: string, funcao: string, email: string) {
    this.token = token;
    this.user = user;
    if (funcao == 'cliente') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      localStorage.setItem('funcao', funcao);
    } else {
      this.funcao = funcao;
    }
    this.email = email;
  }

  //METODO 04
  getToken() {
    if (localStorage.getItem('funcao') == 'cliente') {
      return localStorage.getItem('token');
    } else {
      return this.token;
    }
  }

  getUser() {
    if (localStorage.getItem('funcao') == 'cliente') {
      return localStorage.getItem('user');
    } else {
      return this.user;
    }
  }

  getFuncao() {
    if (localStorage.getItem('funcao') == 'cliente') {
      return localStorage.getItem('funcao');
    } else {
      return this.funcao;
    }
  }

  getEmail() {
    return this.email;
  }

  //METODO 06
  private getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  //METODO 05
  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('funcao');
  }

  //METODO ORIGINAL
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else {
      return false;
    }
  }
}
