import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { VacinaService } from '../vacina.service';

@Component({
  selector: 'app-busca-agendamento',
  templateUrl: './busca-agendamento.component.html',
  styleUrls: ['./busca-agendamento.component.css'],
})
export class BuscaAgendamentoComponent implements OnInit {
  usuario = {} as Usuario;
  usuarios: any;
  cpf: any;
  dt_nasc : any;

  p: number = 1;
  count: number = 10;

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
  dtNascMask = [/[0-9]/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private service: VacinaService) {}

  ngOnInit(): void {}

  buscaUser() {
    this.getProducts();
  }

  info: boolean = true;
  getProducts() {
    this.service
      .getPorCpf(this.cpf, this.dt_nasc)
      .subscribe((res: Usuario[]) => {
        this.ver(res);
        this.usuarios = res;
      });
  }

  ver(res: Usuario[]) {
    if (res.length == 0) {
      this.info = true;
    } else {
      this.info = false;
    }
  }
}
