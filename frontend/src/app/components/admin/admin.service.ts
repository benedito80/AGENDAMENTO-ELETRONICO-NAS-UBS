import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retry, tap } from 'rxjs/operators';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { environment } from 'src/environments/environment';
import { Atividade } from '../../shared/models/atividade-model';
import { Detalhe } from '../../shared/models/detalhe-model';
import { Horas } from '../../shared/models/horas-model';
import { Procedimento } from '../../shared/models/procedimento-model';
import { UBS } from '../../shared/models/ubs-model';
import { USERS } from '../../shared/models/users-model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getUbs(): Observable<UBS[]> {
    const url = `${environment.API}/ubs`;
    return this.httpClient
      .get<any[]>(url, this.httpOptions)
      .pipe
      // delay(2000),
      // tap(console.log)
      ();
  }

  getAtiv(): Observable<Atividade[]> {
    const url = `${environment.API}/atividades`;
    return this.httpClient
      .get<Atividade[]>(url, this.httpOptions)
      .pipe
      // delay(2000),
      // tap(console.log)
      ();
  }

  getHoras(): Observable<Horas[]> {
    const url = `${environment.API}/horas`;
    return this.httpClient
      .get<Horas[]>(url, this.httpOptions)
      .pipe
      // delay(2000),
      // tap(console.log)
      ();
  }

  getHorasEnviada(): Observable<any[]> {
    const url = `${environment.API}/horas/enviado-false`;
    return this.httpClient
      .get<any[]>(url, this.httpOptions)
      .pipe
      // delay(2000),
      // tap(console.log)
      ();
  }

  saveUbs(obj: UBS): Observable<UBS> {
    const url = `${environment.API}/ubs`;
    return this.httpClient
      .post<any>(url, JSON.stringify(obj), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveAtiv(obj: Atividade): Observable<Atividade> {
    const url = `${environment.API}/atividades`;
    return this.httpClient
      .post<any>(url, JSON.stringify(obj), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveUser(obj: USERS): Observable<USERS> {
    const url = `${environment.API}/users`;
    return this.httpClient
      .post<USERS>(url, JSON.stringify(obj), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveHoras(obj: any): Observable<any> {
    const url = `${environment.API}/horas`;
    return this.httpClient
      .post<any>(url, JSON.stringify(obj), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteUbs(obj: any) {
    const url = `${environment.API}/ubs/${obj._id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteAtiv(obj: any) {
    const url = `${environment.API}/atividades/${obj._id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteHoras(obj: any) {
    const url = `${environment.API}/horas/${obj._id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateUbs(obj: any): Observable<UBS> {
    const url = `${environment.API}/ubs/${obj._id}`;
    return this.httpClient
      .put<UBS>(
        url,
        obj,
        // JSON.stringify(car),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateAtiv(obj: any): Observable<Atividade> {
    const url = `${environment.API}/atividades/${obj._id}`;
    return this.httpClient
      .put<Atividade>(
        url,
        obj,
        // JSON.stringify(car),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateHora(obj: any): Observable<any> {
    const url = `${environment.API}/horas/${obj._id}`;
    return this.httpClient
      .put<any>(
        url,
        obj,
        // JSON.stringify(car),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getDatasEnviada(): Observable<any[]> {
    const url = `${environment.API}/datas/enviado-false`;
    return this.httpClient
      .get<any[]>(url, this.httpOptions)
      .pipe
      // delay(2000),
      // tap(console.log)
      ();
  }

  getAllDatas(): Observable<any[]> {
    const url = `${environment.API}/datas`;
    return this.httpClient
      .get<any[]>(url, this.httpOptions)
      .pipe
      // delay(2000),
      // tap(console.log)
      ();
  }

  getDetalheEnviado(): Observable<any[]> {
    const url = `${environment.API}/detalhes/enviado-false`;
    return this.httpClient
      .get<any[]>(url, this.httpOptions)
      .pipe
      // delay(2000),
      // tap(console.log)
      ();
  }

  getAllDetalhe(): Observable<any[]> {
    const url = `${environment.API}/detalhes`;
    return this.httpClient
      .get<any[]>(url, this.httpOptions)
      .pipe
      // delay(2000),
      // tap(console.log)
      ();
  }

  deleteDatas(obj: any) {
    const url = `${environment.API}/datas/${obj._id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteDetalhe(obj: any) {
    const url = `${environment.API}/detalhes/${obj._id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateData(obj: Data): Observable<Data> {
    const url = `${environment.API}/datas/${obj._id}`;
    return this.httpClient
      .put<any>(
        url,
        obj,
        // JSON.stringify(car),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateDetalhe(obj: Detalhe): Observable<Detalhe> {
    const url = `${environment.API}/detalhes/${obj._id}`;
    return this.httpClient
      .put<any>(
        url,
        obj,
        // JSON.stringify(car),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  saveDatas(obj: any): Observable<any> {
    const url = `${environment.API}/datas`;
    return this.httpClient
      .post<any>(url, JSON.stringify(obj), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveDetalhe(obj: any): Observable<any> {
    const url = `${environment.API}/detalhes`;
    return this.httpClient
      .post<any>(url, JSON.stringify(obj), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getProcEnviado(): Observable<Procedimento[]> {
    const url = `${environment.API}/procedimentos/enviado-false`;
    return this.httpClient
      .get<Procedimento[]>(url, this.httpOptions)
      .pipe
      // delay(2000),
      // tap(console.log)
      ();
  }

  getAllProc(): Observable<Procedimento[]> {
    const url = `${environment.API}/procedimentos`;
    return this.httpClient
      .get<Procedimento[]>(url, this.httpOptions)
      .pipe
      // delay(2000),
      // tap(console.log)
      ();
  }

  getDatabById(id: any): Observable<any> {
    const url = `${environment.API}/datas/${id}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getProcById(id: any): Observable<any> {
    const url = `${environment.API}/procedimentos/${id}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  saveProcedimento(obj: any): Observable<any> {
    const url = `${environment.API}/procedimentos`;
    return this.httpClient
      .post<any>(url, JSON.stringify(obj), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUsers(): Observable<USERS[]> {
    return this.httpClient
      .get<USERS[]>(`${environment.API}/users`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateUsuario(obj: Usuario): Observable<Usuario> {
    const url = `${environment.API}/usuarios/${obj._id}`;
    return this.httpClient
      .put<Usuario>(
        url,
        obj,
        // JSON.stringify(car),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteUsuario(obj: Horas) {
    const url = `${environment.API}/usuarios/${obj._id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getPorUbsDetSupFalse(ubs: any, detalhe: any): Observable<Usuario[]> {
    const url = `${environment.API}/usuarios/busca/sup-false/${ubs}/${detalhe}`;
    return this.httpClient.get<Usuario[]>(url, this.httpOptions).pipe(
      retry(2)
      //delay(2000)
      //  tap(console.log)
    );
  }

  getPorUbsDetSupTrue(ubs: any, detalhe: any): Observable<Usuario[]> {
    const url = `${environment.API}/usuarios/busca/all/sup-true/${ubs}/${detalhe}`;
    return this.httpClient.get<Usuario[]>(url, this.httpOptions).pipe(
      retry(2)
      //delay(2000)
      //  tap(console.log)
    );
  }

  getPorUbsDetProfFalse(ubs: any, detalhe: any): Observable<Usuario[]> {
    const url = `${environment.API}/usuarios/busca/prof/all/false/${ubs}/${detalhe}`;
    return this.httpClient.get<Usuario[]>(url, this.httpOptions).pipe(
      retry(2)
      //delay(2000)
      //  tap(console.log)
    );
  }

  getPorCpf(cpf: any): Observable<Usuario[]> {
    const url = `${environment.API}/usuarios/cpf/${cpf}`;
    return this.httpClient.get<Usuario[]>(url, this.httpOptions).pipe(
      retry(2)
      //delay(2000)
      //  tap(console.log)
    );
  }

  getUsuariosAtendidos(): Observable<Usuario[]> {
    const url = `${environment.API}/usuarios/atendidos/get/true`;
    return this.httpClient.get<Usuario[]>(url, this.httpOptions).pipe(
      retry(2)
      //delay(2000)
      //  tap(console.log)
    );
  }

  getUsuarios(): Observable<Usuario[]> {
    const url = `${environment.API}/usuarios`;
    return this.httpClient.get<Usuario[]>(url, this.httpOptions).pipe(
      retry(2)
      //delay(2000)
      //  tap(console.log)
    );
  }

  getValidados(): Observable<USERS[]> {
    return this.httpClient
      .get<USERS[]>(`${environment.API}/usuarios/validados`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAtendidosFalse(): Observable<USERS[]> {
    return this.httpClient
      .get<USERS[]>(
        `${environment.API}/usuarios/atendidos/get/all/false`,
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  getValidadosDescartados(): Observable<USERS[]> {
    return this.httpClient
      .get<USERS[]>(
        `${environment.API}/usuarios/validados/descartados`,
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  getAtendTrue(): Observable<USERS[]> {
    return this.httpClient
      .get<USERS[]>(
        `${environment.API}/usuarios/atendidos/get/true`,
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  updateUser(car: USERS): Observable<USERS> {
    return this.httpClient
      .put<USERS>(
        `${environment.API}/users/${car._id}`,
        JSON.stringify(car),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteUser(obj: USERS) {
    return this.httpClient
      .delete(`${environment.API}/users/${obj._id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateProcedimento(obj: any): Observable<any> {
    const url = `${environment.API}/procedimentos/${obj._id}`;
    return this.httpClient
      .put<any>(
        url,
        obj,
        // JSON.stringify(car),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteProcedimento(obj: Procedimento) {
    const url = `${environment.API}/procedimentos/${obj._id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
