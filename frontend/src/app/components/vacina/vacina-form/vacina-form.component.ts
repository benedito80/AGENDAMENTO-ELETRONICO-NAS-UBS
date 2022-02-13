import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService, TipoModal } from 'src/app/shared/modal.service';
import { Horas } from 'src/app/shared/models/horas-model';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { Detalhe } from '../../../shared/models/detalhe-model';
import { Procedimento } from '../../../shared/models/procedimento-model';
import { UBS } from '../../../shared/models/ubs-model';
import { AuthService } from '../../../auth/auth.service';
import { VacinaService } from '../vacina.service';

@Component({
  selector: 'app-vacina-form',
  templateUrl: './vacina-form.component.html',
  styleUrls: ['./vacina-form.component.css'],
})
export class VacinaFormComponent implements OnInit {
  usuario = {} as Usuario;
  usuarioCatPrior: any;

  ubs$ = [] as any;
  ubs = {} as UBS;

  ativ$ = [] as any;
  ativ = {} as Procedimento;

  proc$ = [] as any;
  proc = {} as Procedimento;

  dataDeDetalheById$ = [] as any;
  objData = {} as Detalhe;

  mostraAtiv = false;
  mostraResProc = false;
  mostraData = false;
  mostraHrDisp = false;

  resGetUbsById$: any;
  resGetAtivById$: any;
  resGetDataByIdHoras$ = [] as any;
  resGetDataByIdDia$: any;
  resGetDataById$: any;
  resDetalheDeDetalheById$: any;

  mudaHoras_paramHr$: any;
  mudaHoras_paramObjHoras$: any;
  mudaData_ParamGetDataById$: any;
  mudaDetalhe_Proc$: any;
  mudaPostoGet_ProcUbs_UbsById$: any;
  mudaProc_Ativ$: any;

  userLogado = false;

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
  cnsMask = [
    /[0-9]/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
  ];
  celMask = [
    '(',
    /[0-9]/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  cepMask = [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  dtNascMask = [/[0-9]/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  serverErrorMessages: any;

  constructor(
    private service: VacinaService,
    private modalService: ModalService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.get_All_Ubs();
  }

  //METODOS DE LOGIN LOGOUT
  logarUserPadrao(): any {
    this.auth
      .login({ email: 'usuariopadrao@hotmail.com', password: 'padrao@hot' })
      .subscribe((res: any) => {
        this.auth.setToken(res['token'], res[''], res[''], res['']);
        this.userLogado = res.ativo;
      });
  }

  onLogout() {
    this.auth.setToken('', '', '', '');
  }

  //METODS MENSAGENS
  msgHrIndisp() {
    this.modalService.showModalPerigo(
      'Este horário já se encontra indisponível, tente outro!',
      TipoModal.INFO
    );
  }

  msgUpdateDados() {
    this.modalService.showAModalSucesso('Aguarde, atualizando dados...', 1500);
  }

  msgSisIndisp() {
    this.modalService.showModalPerigo(
      'Sistema indisponível temporariamente, tente mais tarde...',
      TipoModal.INFO
    );
  }

  //METODOS INDIVIDUAIS
  deslogarSetInterval() {
    setTimeout(() => {
      this.onLogout();
    }, 3000);
  }

  dadosFormObrig(f: any) {
    if (f.form.invalid) {
      this.modalService.showModalPerigo(
        'Existe dados obrigatorios vazios!',
        TipoModal.INFO
      );
    }
  }

  calc_Idade() {
    let ds = new Date();
    let invertida = this.usuario.data_nasc.split('-').reverse().join('-');
    let dn = new Date(invertida);
    let idades = ds.getFullYear() - dn.getFullYear();

    if (ds.getMonth() != dn.getMonth()) {
      if (ds.getMonth() < dn.getMonth()) {
        idades--;
      }
    } else {
      if (ds.getDate() < dn.getDate()) idades--;
    }

    return idades;
  }

  pegaCatPrior(obj: any) {
    this.usuarioCatPrior = obj;
  }

  //METODOS GET
  get_All_Ubs() {
    this.service.getUbs().subscribe((res: UBS[]) => {
      this.ubs$ = res;
    });
  }

  getAllAtividades() {
    this.service.getAllAtividades().subscribe((res: Procedimento[]) => {
      this.ativ$ = res;
    });
  }

  getProcUbs() {
    this.service
      .getProcUbs(this.mudaPostoGet_ProcUbs_UbsById$)
      .subscribe((res: Procedimento[]) => {
        this.proc$ = res;
        if (res.length == 0) {
          this.modalService.showModalPerigo(
            'UBS sem agenda para este periodo...',
            TipoModal.INFO
          );
          this.mostraResProc = false;
          this.mostraAtiv = false;
        }
      });
  }

  getDetalheById() {
    this.service
      .getDetalheById(this.mudaDetalhe_Proc$)
      .subscribe((res: any) => {
        this.resDetalheDeDetalheById$ = res.detalhe;
        this.dataDeDetalheById$ = res.data;
      });
  }

  getUbsById() {
    this.service
      .getUbsById(this.mudaPostoGet_ProcUbs_UbsById$)
      .subscribe((res: any) => {
        this.resGetUbsById$ = res.ubs;
      });
  }

  getAtivById() {
    this.service.getAtivById(this.mudaProc_Ativ$).subscribe((res: any) => {
      this.resGetAtivById$ = res.atividade;
    });
  }

  getDataById_delDataExp() {
    this.service
      .getDataById(this.mudaData_ParamGetDataById$)
      .subscribe((res: any) => {
        this.resGetDataById$ = res;
        this.resGetDataByIdHoras$ = res.horas;
        this.resGetDataByIdDia$ = res.dia;

        this.validDeleteDataExp(res);

        if (res.horas.length == 0) {
          this.modalService.showModalPerigo(
            'Data inválida ou sem horário disponivel excluidas com sucesso...',
            TipoModal.INFO
          );

          if (this.auth.isLoggedIn()) {
            this.deleteData();
          } else {
            this.logarUserPadrao();

            setTimeout(() => {
              if (this.userLogado) {
                this.deleteData();
                this.deslogarSetInterval();
              }
            }, 2000);
          }
        }
      });
  }

  getHrById_saveUserDelHr() {
    this.service
      .getHorasById(this.mudaHoras_paramObjHoras$._id)
      .subscribe((res) => this.saveUsuario_DelHoras(res));
  }

  //METODOS MUDA
  mudaProcedimento(valor: Procedimento) {
    this.mudaProc_Ativ$ = valor;
    this.getAtivById();
  }

  mudaDetalhe(valor: Procedimento) {
    this.mudaDetalhe_Proc$ = '';
    this.mudaData_ParamGetDataById$ = '';
    this.mudaHoras_paramHr$ = '';
    if (valor) {
      this.dataDeDetalheById$ = null;
      this.objData = {};

      this.resGetDataByIdHoras$ = null;

      this.mostraData = true;
      this.mostraHrDisp = false;

      this.mudaDetalhe_Proc$ = valor;
      this.getDetalheById();
    } else {
      this.dataDeDetalheById$ = null;
      this.objData = {};

      this.resGetDataByIdHoras$ = null;

      this.mostraData = false;
      this.mostraHrDisp = false;
    }
  }

  mudaData(valor: Detalhe) {
    this.mudaData_ParamGetDataById$ = '';
    this.mudaHoras_paramHr$ = '';
    if (valor) {
      this.resGetDataByIdHoras$ = null;

      this.mostraHrDisp = true;

      this.mudaData_ParamGetDataById$ = valor;
      this.getDataById_delDataExp();

      this.mostraHrDisp = true;
    } else {
      this.resGetDataByIdHoras$ = null;
      this.mostraHrDisp = false;
    }
  }

  mudaPosto(valor: UBS) {
    this.mudaPostoGet_ProcUbs_UbsById$ = '';
    this.mudaProc_Ativ$ = '';
    this.mudaDetalhe_Proc$ = '';
    this.mudaData_ParamGetDataById$ = '';
    this.mudaHoras_paramHr$ = '';
    if (valor) {
      this.ativ$ = null;
      this.ativ = {};

      this.proc$ = null;
      this.proc = {};

      this.dataDeDetalheById$ = null;
      this.objData = {};

      this.resGetDataByIdHoras$ = null;

      this.mostraResProc = false;
      this.mostraData = false;
      this.mostraHrDisp = false;
      this.mostraResProc = true;

      this.mudaPostoGet_ProcUbs_UbsById$ = valor;
      this.getProcUbs();

      this.getAllAtividades();
      this.getUbsById();
      this.verificaInputUbs();
      this.mostraAtiv = true;
    } else {
      this.ativ$ = null;
      this.ativ = {};

      this.proc$ = null;
      this.proc = {};

      this.dataDeDetalheById$ = null;
      this.objData = {};

      this.resGetDataByIdHoras$ = null;

      this.mostraAtiv = false;
      this.mostraResProc = false;
      this.mostraData = false;
      this.mostraHrDisp = false;
    }
  }

  mudaHoras(obj: any) {
    this.mudaHoras_paramObjHoras$ = null;
    this.mudaHoras_paramHr$ = null;
    this.mudaHoras_paramObjHoras$ = obj;
    this.mudaHoras_paramHr$ = obj.hr;
  }

  //METODOS DE VERIDICAÇÃO
  verificaInputUbs() {
    if (
      !this.mudaPostoGet_ProcUbs_UbsById$ ||
      this.mudaPostoGet_ProcUbs_UbsById$ == null
    ) {
      return true;
    } else {
      return false;
    }
  }

  verificaInputAtiv() {
    if (!this.mudaProc_Ativ$ || this.mudaProc_Ativ$ == null) {
      return true;
    } else {
      return false;
    }
  }

  verificaInputDetalhe() {
    if (!this.mudaDetalhe_Proc$ || this.mudaDetalhe_Proc$ == null) {
      return true;
    } else {
      return false;
    }
  }

  verificaInputData() {
    if (
      !this.mudaData_ParamGetDataById$ ||
      this.mudaData_ParamGetDataById$ == null
    ) {
      return true;
    } else {
      return false;
    }
  }

  verificaInputHoras() {
    if (!this.mudaHoras_paramHr$ || this.mudaHoras_paramHr$ == null) {
      return true;
    } else {
      return false;
    }
  }

  //METODOS DELETE
  exluiArrayHoras(obj: any) {
    for (let i = 0; i < obj.horas.length; i++) {
      this.service.deleteHoras(obj.horas[i]).subscribe();
    }
  }

  horasDoServ$: any;
  saveHorasServidor() {
    this.service
      .saveHorasServidor()
      .subscribe((res: any) => (this.horasDoServ$ = res.data));
  }

  mapeadaHorasDelete(obj: Horas) {
    this.saveHorasServidor();
    this.mudaHoras(obj);
    const hr = obj.hr.substring(0, 2);
    const min = obj.hr.substring(3, 5);
    const da = new Date(this.resGetDataById$.dia);
    da.setDate(da.getDate() + 1);
    da.setHours(hr);
    da.setMinutes(min);

    setTimeout(() => {
      const ds = new Date(this.horasDoServ$);
      if (ds.getMonth() >= da.getMonth()) {
        if (ds.getDate() >= da.getDate()) {
          if (ds.getHours() > da.getHours()) {
            const mensHr =
              'A hora selecionado encontrava-se inválida e foi excluida, tente outra...  ';
            this.validDelHoras(obj, mensHr);
          }

          if (ds.getHours() == da.getHours()) {
            if (ds.getMinutes() >= da.getMinutes()) {
              const mensM =
                'Não ha mais tempo a equipe esta atendendo nesse momento, tente outro horário...';
              this.validDelHoras(obj, mensM);
            }
          }
        }
      }
    }, 1000);
  }

  validDelHoras(obj: any, msg: string) {
    if (this.auth.isLoggedIn()) {
      this.msgUpdateDados();
      this.delHorasSetInterv(obj, msg);
    } else {
      this.msgUpdateDados();
      this.logarUserPadrao();

      setTimeout(() => {
        if (this.userLogado) {
          this.delHorasSetInterv(obj, msg);
          this.deslogarSetInterval();
        }
      }, 1000);
    }
  }

  validDeleteDataExp(obj: any) {
    let data = new Date(obj.dia);
    data.setDate(data.getDate() + 1);
    this.saveHorasServidor();

    setTimeout(() => {
      const dataServidor = new Date(this.horasDoServ$);
      dataServidor.setDate(dataServidor.getDate());

      if (dataServidor.getDate() > data.getDate()) {
        if (this.auth.isLoggedIn()) {
          this.msgUpdateDados();
          this.deleteDataExp(obj);
        } else {
          this.logarUserPadrao();
          this.msgUpdateDados();

          setTimeout(() => {
            if (this.userLogado) {
              this.deleteDataExp(obj);
              this.deslogarSetInterval();
            }
          }, 2000);
        }
      }
    }, 2000);
  }

  delHorasSetInterv(obj: any, msg: string) {
    setTimeout(() => {
      this.service.deleteHoras(obj).subscribe((success) => {
        this.modalService.showModalPerigo(msg, TipoModal.INFO);
        this.getDataById_delDataExp();
        this.resGetDataByIdHoras$ = null;
        this.mudaHoras_paramHr$ = null;
      });
    }, 1000);
  }

  deleteDataExp(obj: any) {
    this.service.deleteData(obj).subscribe((success) => {
      this.modalService.showModalPerigo(
        'A data expirada foi excluida, tente outra...',
        TipoModal.INFO
      );
      this.getDetalheById();
      this.resGetDataByIdHoras$ = null;

      this.exluiArrayHoras(obj);

      //
    });
  }

  deleteData() {
    if (this.resGetDataByIdHoras$.length == 0) {
      this.service.deleteData(this.resGetDataById$).subscribe((success) => {
        this.mudaDetalhe(this.mudaDetalhe_Proc$);
      });
    }
  }

  //METODOS SAVE
  save(f: NgForm) {
    this.usuario.ubs = this.resGetUbsById$;
    this.usuario.atividade = this.resGetAtivById$;
    this.usuario.detalhe = this.resDetalheDeDetalheById$;
    this.usuario.prioridade = this.usuarioCatPrior.prioridade;
    this.usuario.categoria = this.usuarioCatPrior.categoria;
    this.usuario.dia = this.resGetDataByIdDia$;
    this.usuario.horas = this.mudaHoras_paramHr$;
    this.usuario.idade = this.calc_Idade();

    if (
      f.form.invalid ||
      this.verificaInputUbs() ||
      this.verificaInputAtiv() ||
      this.verificaInputDetalhe() ||
      this.verificaInputData() ||
      this.verificaInputHoras()
    ) {
      this.modalService.showModalPerigo(
        'Existe dados obrigatorios vazios!',
        TipoModal.INFO
      );
    } else {
      if (this.usuario.n_celular?.includes('_')) {
        this.modalService.showModalPerigo(
          'O campo Nº Celular está incompleto',
          TipoModal.INFO
        );
        return;
      }
      if (this.usuario.data_nasc?.includes('_')) {
        this.modalService.showModalPerigo(
          'O campo Data.Nasc está incompleto',
          TipoModal.INFO
        );
        return;
      }
      if (this.usuario.cns?.includes('_')) {
        this.modalService.showModalPerigo(
          'O campo CNS está incompleto',
          TipoModal.INFO
        );
        return;
      }
      if (this.usuario.cpf?.includes('_')) {
        this.modalService.showModalPerigo(
          'O campo CPF está incompleto',
          TipoModal.INFO
        );
        return;
      }
      if (this.usuario.cep?.includes('_')) {
        this.modalService.showModalPerigo(
          'O campo CEP está incompleto',
          TipoModal.INFO
        );
        return;
      }
      this.modalService.showAModalSucesso(
        'Aguarde, processando os dados...',
        2000
      );
      this.getHrById_saveUserDelHr();
    }
  }

  saveUsuario() {
    this.service.saveUsuario(this.usuario).subscribe(
      (success) => {
        this.service.deleteHoras(this.mudaHoras_paramObjHoras$).subscribe(
          (success) => {
            this.modalService.showAModalSucesso(
              'Agendamento realizado com sucesso!',
              2000
            );
            this.router.navigateByUrl('/');
          },
          (error) => {
            this.modalService.showModalPerigo(
              'Erro interno!',
              TipoModal.PERIGO
            );
          }
        );
      },
      (error) => {
        this.modalService.showModalPerigo('Erro interno!', TipoModal.PERIGO);
      }
    );
  }

  saveUsuario_DelHoras(res: any) {
    if (this.auth.isLoggedIn()) {
      if (res == null || res == undefined) {
        this.msgHrIndisp();
      } else {
        this.saveUsuario();
      }
    } else {
      if (res == null || res == undefined) {
        this.msgHrIndisp();
      } else {
        this.logarUserPadrao();

        setTimeout(() => {
          if (this.userLogado) {
            this.saveUsuario();
            this.deslogarSetInterval();
          } else {
            this.msgSisIndisp();
          }
        }, 2000);
      }
    }
  }
}
