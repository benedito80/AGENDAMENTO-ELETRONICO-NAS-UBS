import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Horas } from 'src/app/shared/models/horas-model';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { environment } from 'src/environments/environment';
import { Atividade } from '../../shared/models/atividade-model';
import { Data } from '../../shared/models/data-model';
import { Detalhe } from '../../shared/models/detalhe-model';
import { Procedimento } from '../../shared/models/procedimento-model';
import { UBS } from '../../shared/models/ubs-model';

@Injectable({
  providedIn: 'root',
})
export class VacinaService {
  constructor(private httpClient: HttpClient) {}
  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getUbs(): Observable<UBS[]> {
    const url = `${environment.API}/ubs`;
    return this.httpClient
      .get<UBS[]>(url, this.httpOptions)
      .pipe
      //  delay(1000), tap(console.log)
      ();
  }

  getAllAtividades(): Observable<Atividade[]> {
    const url = `${environment.API}/atividades`;
    return this.httpClient
      .get<Atividade[]>(url, this.httpOptions)
      .pipe
      //  delay(1000), tap(console.log)
      ();
  }

  getProcUbs(ubs: any): Observable<Procedimento[]> {
    const url = `${environment.API}/procedimentos/ubs/${ubs}`;
    return this.httpClient
      .get<Procedimento[]>(url, this.httpOptions)
      .pipe
      //  delay(1000), tap(console.log)
      ();
  }

  getUbsById(id: any): Observable<Procedimento> {
    const url = `${environment.API}/ubs/${id}`;
    return this.httpClient.get<Procedimento>(url, this.httpOptions).pipe(
      retry(2)
      //  tap(console.log)
    );
  }

  getAtivById(id: any): Observable<Atividade> {
    const url = `${environment.API}/atividades/${id}`;
    return this.httpClient.get<Atividade>(url, this.httpOptions).pipe(
      retry(2)
      //  tap(console.log)
    );
  }

  getDataById(id: any): Observable<Data> {
    const url = `${environment.API}/datas/${id}`;
    return this.httpClient.get<Data>(url, this.httpOptions).pipe(
      retry(2)
      //  tap(console.log)
    );
  }

  getHorasById(id: any): Observable<Horas> {
    const url = `${environment.API}/horas/${id}`;
    return this.httpClient.get<Horas>(url, this.httpOptions).pipe(
      retry(2)
      //  tap(console.log)
    );
  }

  getDetalheById(id: any): Observable<Detalhe[]> {
    const url = `${environment.API}/detalhes/${id}`;
    return this.httpClient
      .get<Detalhe[]>(url, this.httpOptions)
      .pipe
      //  delay(1000), tap(console.log)
      ();
  }

  getUsuarios(): Observable<Usuario[]> {
    const url = `${environment.API}/usuarios`;
    return this.httpClient.get<Usuario[]>(url, this.httpOptions).pipe(
      retry(2)
      //delay(2000)
      //  tap(console.log)
    );
  }

  getPorCpf(cpf: any, dia: any): Observable<any> {
    const url = `${environment.API}/usuarios/${cpf}/${dia}`;
    return this.httpClient.get<any>(url, this.httpOptions).pipe(
      retry(2),
      //  tap(console.log),
      catchError(this.handleError)
    );
  }

  saveUsuario(obj: Usuario): Observable<Usuario> {
    const url = `${environment.API}/usuarios`;
    return this.httpClient
      .post<Usuario>(url, JSON.stringify(obj), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  saveHorasServidor(): Observable<any> {
    const url = `${environment.API}/data-servidor`;
    return this.httpClient
      .post<any>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteHoras(obj: Horas) {
    const url = `${environment.API}/horas/${obj._id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteData(obj: Data) {
    const url = `${environment.API}/datas/${obj._id}`;
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
