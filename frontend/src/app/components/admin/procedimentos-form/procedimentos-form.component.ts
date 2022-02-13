import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalService, TipoModal } from 'src/app/shared/modal.service';
import { Atividade } from '../../../shared/models/atividade-model';
import { Data } from '../../../shared/models/data-model';
import { Detalhe } from '../../../shared/models/detalhe-model';
import { Horas } from '../../../shared/models/horas-model';
import { Procedimento } from '../../../shared/models/procedimento-model';
import { UBS } from '../../../shared/models/ubs-model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './procedimentos-form.component.html',
  styleUrls: ['./procedimentos-form.component.css'],
})
export class ProcedimentosFormComponent implements OnInit {
  constructor(
    private service: AdminService,
    private modalService: ModalService
  ) {}

  ubs = {} as UBS;
  ubs$: UBS[] = [];

  ativ = {} as Atividade;
  ativ$: Atividade[] = [];

  hora = {} as Horas;
  horas$: Horas[] = [];
  idHoras: any;
  intervalo: any;

  inicioM: any;
  fimM: any;

  data = {} as Data;
  datas$: Data[] = [];
  idDatasNotEnviado: any;

  detalhe = {} as Detalhe;
  detalhe$: Detalhe[] = [];
  idDetalheNotEnviado: any;

  proc = {} as Procedimento;
  proc$: Procedimento[] = [];

  procAll$: Procedimento[] = [];

  idProcNotEnviado: any;

  valorDataById: any;

  dataMask = [/[0-9]/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  ngOnInit() {}

  // METODOS START OBJECTS
  iniciaUbs() {
    this.getUbs();
  }

  iniciaAtiv() {
    this.getAtiv();
  }

  iniciaHoras() {
    this.getHorasEnviada();
  }

  iniciaData() {
    this.getHorasEnviada();
    this.getDatasEnviada();
  }

  iniciaProc() {
    this.getUbs();
    this.getAtiv();
    this.getDetalheEnviado();
    this.getProcEnviado();
  }

  iniciaDetalhe() {
    this.getDatasEnviada();
    this.getDetalheEnviado();
    this.getUbs();
  }

  // METODOS TORNA TRUE
  tornaHoraTrue() {
    for (let i = 0; i < this.horas$.length; i++) {
      let hrs = this.horas$[i];
      hrs.enviado = true;
      this.service.updateHora(hrs).subscribe(
        (success) => {
          this.hora._id = undefined;
        },
        (error) => {
          this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO);
        }
      );
    }
  }

  tornaDataTrue() {
    for (let i = 0; i < this.datas$.length; i++) {
      let obj = this.datas$[i];
      obj.enviado = true;
      this.service.updateData(obj).subscribe(
        (success) => {
          this.data._id = undefined;
        },
        (error) => {
          this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO);
        }
      );
    }
  }

  tornaDetalheTrue() {
    for (let i = 0; i < this.detalhe$.length; i++) {
      let obj = this.detalhe$[i];
      obj.enviado = true;
      this.service.updateDetalhe(obj).subscribe(
        (success) => {
          this.detalhe._id = undefined;
        },
        (error) => {
          this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO);
        }
      );
    }
  }

  tornaProcedimentoTrue() {
    for (let i = 0; i < this.proc$.length; i++) {
      let obj = this.proc$[i];
      obj.enviado = true;
      this.service.updateProcedimento(obj).subscribe(
        (success) => {
          this.proc._id = undefined;
        },
        (error) => {
          this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO);
        }
      );
    }
  }

  descartarAllHoras() {
    if (this.horas$.length == 0) {
      this.modalService.showModalPerigo(
        'Não existe dados para descartar...',
        TipoModal.INFO
      );
    } else {
      if (confirm('Deseja excluir todo os registros abaixo?')) {
        // console.log(this.horas$);
        for (let i = 0; i < this.horas$.length; i++) {
          this.service.deleteHoras(this.horas$[i]).subscribe(
            (success) => {
              this.modalService.showAModalSucesso(
                'Aguarde, excluindo os dados!',
                1000
              );
            },
            (error) => {
              this.modalService.showModalPerigo(
                'Erro interno',
                TipoModal.PERIGO
              );
            }
          );
        }
        this.getHorasEnviada();
      }
    }
  }

  formatData(date: any) {
    const d = this.formataData(date.getDate());
    const mo = this.formataData(date.getMonth() + 1);
    const y = this.formataData(date.getFullYear());
    const h = this.formataData(date.getHours());
    const mi = this.formataData(date.getMinutes());
    const s = this.formataData(date.getSeconds());
    //return `${d}/${mo}/${y} ${h}:${mi}:${s}`;
    return `${h}:${mi}`;
  }

  formataData(date: any) {
    return date <= 9 ? `0${date}` : `${date}`;
  }

  inputObrig(a: any, b: any, c: any) {
    if (a == undefined || b == undefined || c == undefined) return true;
    return false;
  }

  randomTempo() {
    let aux = 0;
    const date1 = new Date(this.inicioM);
    const date2 = new Date(this.fimM);

    if (date1 >= date2) {
      this.modalService.showModalPerigo(
        '"Data Inicio" deve ser menor que "Data Fim"!',
        TipoModal.INFO
      );
      return;
    } else {
      if (this.intervalo <= 0) {
        this.modalService.showModalPerigo(
          'O intevalo deve ser maior que 0!',
          TipoModal.INFO
        );
        return;
      }

      date2.setMinutes(date2.getMinutes() - this.intervalo);

      let bloqueio = 0;
      while (date2 > date1) {
        if (bloqueio > 299) {
          this.modalService.showModalPerigo(
            'Parte de sua entrada foi bloqueada, devido a seu tamanho...',
            TipoModal.INFO
          );
          break;
        }
        const k = date1.setMinutes(date1.getMinutes() + aux);
        this.hora = {
          hr: this.formatData(new Date(k)),
        };

        this.service.saveHoras(this.hora).subscribe(
          (success) => {
            if (date1 >= date2) {
              this.modalService.showAModalSucesso(
                'Aguarde, registrando horários...',
                1000
              );
            }
          },
          (error) => {
            this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO);
          }
        );
        aux = this.intervalo;
        bloqueio += 1;
      }
    }
  }

  incrementaData() {
    const vetor = [];
    const horasNotEnviados = this.idHoras;
    const horasAtivos = this.data.horas.map((p: any) => p._id);

    for (let i = 0; i < horasNotEnviados.length; i++) {
      vetor.push(horasNotEnviados[i]);
    }

    for (let i = 0; i < horasAtivos.length; i++) {
      vetor.push(horasAtivos[i]);
    }

    return vetor;
  }

  incrementaProc() {
    const vetor = [];
    const procNotEnviados = this.idDetalheNotEnviado;
    const procAtivos = this.proc.detalhe.map((r: any) => r._id);

    for (let i = 0; i < procNotEnviados.length; i++) {
      vetor.push(procNotEnviados[i]);
    }

    for (let i = 0; i < procAtivos.length; i++) {
      vetor.push(procAtivos[i]);
    }

    return vetor;
  }

  incrementaDetalhe() {
    const vetor = [];
    const detalhesNotEnviados = this.idDatasNotEnviado;
    const detalhesAtivos = this.detalhe.data.map((r: any) => r._id);

    for (let i = 0; i < detalhesNotEnviados.length; i++) {
      vetor.push(detalhesNotEnviados[i]);
    }

    for (let i = 0; i < detalhesAtivos.length; i++) {
      vetor.push(detalhesAtivos[i]);
    }

    return vetor;
  }

  private excluiHorasDeDatas(obj: Data) {
    const horas: any = obj.horas;
    for (let i = 0; i < horas.length; i++) {
      this.service.deleteHoras(horas[i]).subscribe();
    }
  }

  detalheExcluiDatasHorarios(obj: any) {
    let data = {} as Data;
    let horas = {} as Horas;
    const tam = obj.data.length;
    let tamHoras: any;

    for (let i = 0; i < tam; i++) {
      tamHoras = obj.data.map((r: any) => r)[i].horas.length;
      for (let j = 0; j < tamHoras; j++) {
        horas._id = obj.data.map((r: any) => r)[i].horas[j];
        this.service.deleteHoras(horas).subscribe();
      }

      data._id = obj.data.map((r: any) => r._id)[i];
      this.service.deleteDatas(data).subscribe();
    }

    return tamHoras;
  }

  // METODOS GET
  getUbs() {
    this.service.getUbs().subscribe((res: UBS[]) => {
      this.ubs$ = res;
    });
  }

  getAtiv() {
    this.service.getAtiv().subscribe((res: Atividade[]) => {
      this.ativ$ = res;
    });
  }

  getHorasEnviada() {
    this.service.getHorasEnviada().subscribe((res: Horas[]) => {
      this.horas$ = res;
      this.idHoras = res.map((r) => r._id);
    });
  }

  getDatasEnviada() {
    this.service.getDatasEnviada().subscribe((res: Data[]) => {
      this.datas$ = res;
      this.idDatasNotEnviado = res.map((r) => r._id);
    });
  }

  getAllDatas() {
    this.service.getAllDatas().subscribe((res: Data[]) => {
      if (res.length == 0) {
        this.modalService.showModalPerigo(
          'Nenhum registro a editar...',
          TipoModal.INFO
        );
      } else {
        this.datas$ = res;
      }
    });
  }

  getProcEnviado() {
    this.service.getProcEnviado().subscribe((res: Procedimento[]) => {
      this.proc$ = res;
    });
  }

  getAllProc() {
    this.service.getAllProc().subscribe((res: Procedimento[]) => {
      if (res.length == 0) {
        this.modalService.showModalPerigo(
          'Nenhum registro a editar...',
          TipoModal.INFO
        );
      } else {
        this.proc$ = res;
      }
    });
  }

  getAllDetalhe() {
    this.service.getAllDetalhe().subscribe((res: Detalhe[]) => {
      if (res.length == 0) {
        this.modalService.showModalPerigo(
          'Nenhum registro a editar...',
          TipoModal.INFO
        );
      } else {
        this.detalhe$ = res;
      }
    });
  }

  getDetalheEnviado() {
    this.service.getDetalheEnviado().subscribe((res: Detalhe[]) => {
      this.detalhe$ = res;
      this.idDetalheNotEnviado = res.map((r) => r._id);
    });
  }

  // METODOS LIMPAR
  limparHora() {
    this.hora = {} as Horas;
  }

  limpaDetalhe() {
    this.detalhe = {} as Detalhe;
    this.getDetalheEnviado();
  }

  limparUbs() {
    this.ubs = {} as UBS;
  }

  limparAtiv() {
    this.ativ = {} as Atividade;
  }

  limpaData() {
    this.data = {} as Data;
    this.getDatasEnviada();
  }

  limparProc() {
    this.proc = {} as Procedimento;
    this.getProcEnviado();
  }

  // METODOS CLEAR
  cleanFormHoras(form2: NgForm) {
    form2.resetForm();
    this.limparHora();
    this.getHorasEnviada();
  }

  cleanFormUbs(form: NgForm) {
    form.resetForm();
    this.limparUbs();
    this.getUbs();
  }

  cleanFormAtiv(form: NgForm) {
    form.resetForm();
    this.limparAtiv();
    this.getAtiv();
  }

  cleanFormDatas(form3: NgForm) {
    form3.resetForm();
    this.limpaData();
    this.getDatasEnviada();
  }

  cleanFormProc(form: NgForm) {
    form.resetForm();
    this.limparProc();
    this.getProcEnviado();
  }

  cleanFormDetalhe(form3: NgForm) {
    form3.resetForm();
    this.limpaDetalhe();
    this.getDetalheEnviado();
  }

  // METODOS EDITAR
  editHoras(obj: Horas) {
    this.hora = obj;
  }

  editUbs(obj: UBS) {
    this.ubs = obj;
  }

  editAtiv(obj: Atividade) {
    this.ativ = obj;
  }

  editDatas(obj: Data) {
    if (this.horas$.length <= 0) {
      this.modalService.showModalPerigo(
        'Obs: Não existe novos dados a serem lançados nessa edição!',
        TipoModal.INFO
      );
    } else {
      this.modalService.showAModalSucesso(
        'Para agregar as informações pré-cadastradas ao elemento clicado click no botão Salvar',
        4000
      );
    }
    this.data = obj;
    this.incrementaData();
  }

  editProc(obj: Procedimento) {
    if (this.detalhe$.length <= 0) {
      this.modalService.showModalPerigo(
        'Obs: Não existe novos dados a serem lançados nessa edição!',
        TipoModal.INFO
      );
    } else {
      this.modalService.showAModalSucesso(
        'Para agregar as informações pré-cadastradas ao elemento clicado click no botão Salvar',
        4000
      );
    }
    this.proc = obj;
    this.incrementaProc();
  }

  editDetalhe(obj: Detalhe) {
    if (this.datas$.length <= 0) {
      this.modalService.showModalPerigo(
        'Obs: Não existe novos dados a serem lançados nessa edição!',
        TipoModal.INFO
      );
    } else {
      this.modalService.showAModalSucesso(
        'Se desejar agregar a data ao elemento clicado basta concluir a ação no botão Salvar...',
        5000
      );
    }
    this.detalhe = obj;
    this.incrementaDetalhe();
  }

  // METODOS DELETE
  deleteUbs(obj: UBS) {
    if (confirm('Atenção, tenha segurança ao excluir o item!')) {
      this.service.deleteUbs(obj).subscribe(
        (success) => {
          this.modalService.showAModalSucesso('Excluido com sucesso', 1000);
          this.limparUbs();
          this.getUbs();
        },
        (error) => {
          this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO);
        }
      );
    }
  }

  deleteAtiv(obj: Atividade) {
    if (confirm('Atenção, tenha segurança ao excluir o item!')) {
      this.service.deleteAtiv(obj).subscribe(
        (success) => {
          this.modalService.showAModalSucesso('Excluido com sucesso', 1000);
          this.limparAtiv();
          this.getAtiv();
        },
        (error) => {
          this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO);
        }
      );
    }
  }

  deleteData(obj: Horas) {
    if (
      confirm(
        'Atenção, procedimento que contém apenas uma data cadastrada, exclua por "ESPECIFICAR PROCEDIMENTO", caso contrário click em "OK"!'
      )
    ) {
      this.excluiHorasDeDatas(obj);
      this.service.deleteDatas(obj).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(
            'Data e seus respectivos horários excluidos com sucesso...',
            1000
          );
          this.limpaData();
          this.getDatasEnviada();
        },
        (error) => {
          this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO);
        }
      );
    }
  }

  deleteHora(obj: Horas) {
    if (confirm('Deseja excluir esse horário?')) {
      this.service.deleteHoras(obj).subscribe(
        (success) => {
          this.modalService.showAModalSucesso('Excluido com sucesso', 1000);
          this.limparHora();
          this.getHorasEnviada();
        },
        (error) => {
          this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO);
        }
      );
    }
  }

  // BUSCA AS DATAS PARA deleteProc() e ja chama delProcDatasHoras()
  private getByIdProcDatas(obj: any) {
    let data = [] as any;
    data = obj.detalhe.map((r: any) => r.data);

    for (let i = 0; i < data.length; i++) {
      const tam = data[i];
      for (let j = 0; j < tam.length; j++) {
        this.service.getDatabById(data[i][j]).subscribe((res: any) =>
          this.delProcDatasHoras(
            res.horas.map((p: any) => p),
            data[i][j]
          )
        );
      }
    }
  }

  //EXCLUI ARRAYS DE HORAS E DATA DE PROCEDIMENTOS
  private delProcDatasHoras(arrayHoras: any, dataParam: any) {
    for (let i = 0; i < arrayHoras.length; i++) {
      this.service.deleteHoras(arrayHoras[i]).subscribe(
        (success) => {
          if (arrayHoras.length - 1) {
            let data = {} as Data;
            data._id = dataParam;
            this.service.deleteDatas(data).subscribe(
              (success) => {
                this.modalService.showAModalSucesso(
                  'Aguarde, excluindo dados...',
                  1000
                );
              },
              (error) => {
                this.modalService.showModalPerigo(
                  'Erro interno',
                  TipoModal.PERIGO
                );
              }
            );
          }
        },
        (error) => {
          this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO);
        }
      );
    }
  }

  //GATILHO DE EXCLUSÃO DE PRECEDIMENTOS
  deleteProc(obj: Procedimento) {
    if (
      confirm(
        'Atenção, deseja excluir todos os dados vinculado a esse procedimento?'
      )
    ) {
      this.getByIdProcDatas(obj);
      const tam = obj.detalhe.length;

      for (let i = 0; i < tam; i++) {
        this.service.deleteDetalhe(obj.detalhe[i]).subscribe((success) => {
          this.service.deleteProcedimento(obj).subscribe(
            (success) => {
              this.modalService.showAModalSucesso(
                'Dados excluidos com sucesso...',
                1000
              );
              this.getProcEnviado();
            },
            (error) => {
              this.modalService.showModalPerigo(
                'Erro interno',
                TipoModal.PERIGO
              );
            }
          );
        });
      }
    }
  }

  deleteDetalhe(obj: Detalhe) {
    if (
      confirm(
        'Atenção, a exclusão desse item poderá conter várias datas e horários, deseja prosseguir?'
      )
    ) {
      this.detalheExcluiDatasHorarios(obj);
      this.service.deleteDetalhe(obj).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(
            'Dados excluido com sucesso',
            1000
          );
          this.limpaDetalhe();
          this.getDetalheEnviado();
        },
        (error) => {
          this.modalService.showModalPerigo('Erro interno', TipoModal.PERIGO);
        }
      );
    }
  }

  // METODOS ATUALIZAR OBJETOS
  atualizarData() {
    this.getAllDatas();
  }

  atualizarDetalhe() {
    this.getAllDetalhe();
  }

  atualizarProc() {
    this.getAllProc();
  }

  //METODOS SAVE
  saveUbs(form: NgForm) {
    if (this.ubs._id !== undefined) {
      this.service.updateUbs(this.ubs).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(
            'Ubs atualizada com sucesso!',
            2000
          );
          this.cleanFormUbs(form);
        },
        (error) =>
          this.modalService.showModalPerigo('Erro interno!', TipoModal.PERIGO)
      );
    } else {
      if (this.ubs.ubs == undefined || this.ubs.ubs == '') {
        this.modalService.showModalPerigo(
          'O campo UBS é obrigatório',
          TipoModal.INFO
        );
      } else {
        this.service.saveUbs(this.ubs).subscribe(
          (success) => {
            this.modalService.showAModalSucesso(
              'Ubs inserida com sucesso!',
              2000
            );
            this.cleanFormUbs(form);
          },
          (error) =>
            this.modalService.showModalPerigo('Erro interno!', TipoModal.PERIGO)
        );
      }
    }
  }

  saveAtiv(form: NgForm) {
    if (this.ativ._id !== undefined) {
      this.service.updateAtiv(this.ativ).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(
            'Dados atualizados com sucesso!',
            2000
          );
          this.cleanFormAtiv(form);
        },
        (error) =>
          this.modalService.showModalPerigo('Erro interno!', TipoModal.PERIGO)
      );
    } else {
      if (this.ativ.atividade == undefined || this.ativ.atividade == '') {
        this.modalService.showModalPerigo(
          'O campo ATIVIDADE é obrigatório',
          TipoModal.INFO
        );
      } else {
        this.service.saveAtiv(this.ativ).subscribe(
          (success) => {
            this.modalService.showAModalSucesso(
              'Dados inserido com sucesso!',
              2000
            );
            this.cleanFormAtiv(form);
          },
          (error) =>
            this.modalService.showModalPerigo('Erro interno!', TipoModal.PERIGO)
        );
      }
    }
  }

  saveHoras(form2: NgForm) {
    if (this.hora._id !== undefined) {
      this.service.updateHora(this.hora).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(
            'Ubs atualizada com sucesso!',
            2000
          );
          this.cleanFormHoras(form2);
        },
        (error) =>
          this.modalService.showModalPerigo('Erro interno!', TipoModal.PERIGO)
      );
    } else {
      if (this.inputObrig(this.inicioM, this.fimM, this.intervalo)) {
        this.modalService.showModalPerigo(
          'Todo os campos são obrigatorios!',
          TipoModal.INFO
        );
      } else {
        this.randomTempo();
        this.cleanFormHoras(form2);
      }
    }
  }

  saveData(form3: NgForm) {
    if (this.data._id !== undefined) {
      if (this.data.dia?.includes('_')) {
        this.modalService.showModalPerigo(
          'O campo Dia está incompleto',
          TipoModal.INFO
        );
        return;
      }
      this.data.horas = this.incrementaData();

      this.service.updateData(this.data).subscribe(
        (success) => {
          this.tornaHoraTrue();
          this.cleanFormDatas(form3);
          this.getHorasEnviada();
          this.modalService.showAModalSucesso(
            'Data atualizada com sucesso!',
            2000
          );
          this.cleanFormDatas(form3);
        },
        (error) =>
          this.modalService.showModalPerigo('Erro interno!', TipoModal.PERIGO)
      );
    } else {
      if (this.horas$.length == 0) {
        this.modalService.showModalPerigo(
          'Volte no botão "CADASTRAR HORAS" alimente-o e repita esses passos!',
          TipoModal.INFO
        );
        this.limpaData();
      } else {
        if (
          this.data.dia == undefined ||
          this.data.dia == '' ||
          this.data.controle == undefined ||
          this.data.controle == ''
        ) {
          this.modalService.showModalPerigo(
            'Todos os campos são obrigatórios',
            TipoModal.INFO
          );
        } else {
          if (this.data.dia?.includes('_')) {
            this.modalService.showModalPerigo(
              'O campo Dia está incompleto',
              TipoModal.INFO
            );
            return;
          }
          this.data.horas = this.idHoras;
          this.service.saveDatas(this.data).subscribe(
            (success) => {
              this.tornaHoraTrue();
              this.modalService.showAModalSucesso(
                'Data inserida com sucesso!',
                2000
              );
              this.cleanFormDatas(form3);
              this.getHorasEnviada();
            },
            (error) =>
              this.modalService.showModalPerigo(
                'Erro interno!',
                TipoModal.PERIGO
              )
          );
        }
      }
    }
  }

  saveDetalhe(form3: NgForm) {
    if (this.detalhe._id !== undefined) {
      this.detalhe.data = this.incrementaDetalhe();

      this.service.updateDetalhe(this.detalhe).subscribe(
        (success) => {
          this.tornaDataTrue();
          this.getDatasEnviada();
          this.modalService.showAModalSucesso(
            'Dados atualizado com sucesso!',
            2000
          );
          this.cleanFormDetalhe(form3);
        },
        (error) =>
          this.modalService.showModalPerigo('Erro interno!', TipoModal.PERIGO)
      );
    } else {
      if (this.datas$.length == 0) {
        this.modalService.showModalPerigo(
          'Volte no botão "CADASTRAR DATA" alimente-o e repita esses passos!',
          TipoModal.INFO
        );
        this.limpaDetalhe();
      } else {
        if (
          this.detalhe.categoria == undefined ||
          this.detalhe.categoria == '' ||
          this.detalhe.controle == undefined ||
          this.detalhe.controle == '' ||
          this.detalhe.detalhe == undefined ||
          this.detalhe.detalhe == '' ||
          this.detalhe.prioridade == undefined ||
          this.detalhe.prioridade == ''
        ) {
          this.modalService.showModalPerigo(
            'Todos os campos são obrigatórios',
            TipoModal.INFO
          );
        } else {
          this.detalhe.data = this.idDatasNotEnviado;
          this.service.saveDetalhe(this.detalhe).subscribe(
            (success) => {
              this.tornaDataTrue();
              this.modalService.showAModalSucesso(
                'Dados inserido com sucesso!',
                2000
              );
              this.cleanFormDetalhe(form3);
              this.limpaData();
            },
            (error) =>
              this.modalService.showModalPerigo(
                'Erro interno!',
                TipoModal.PERIGO
              )
          );
        }
      }
    }
  }

  saveProcedimento(form: NgForm) {
    if (this.proc._id !== undefined) {
      this.proc.detalhe = this.incrementaProc();
      this.service.updateProcedimento(this.proc).subscribe(
        (success) => {
          this.tornaDetalheTrue();
          this.tornaProcedimentoTrue();
          this.modalService.showAModalSucesso(
            'Procedimento atualizada com sucesso!',
            2000
          );
          this.cleanFormProc(form);
        },
        (error) =>
          this.modalService.showModalPerigo('Erro interno!', TipoModal.PERIGO)
      );
    } else {
      if (this.detalhe$.length == 0) {
        this.modalService.showModalPerigo(
          'Volte no botão "CADASTRAR DETALHES" alimente-o e repita esses passos!',
          TipoModal.INFO
        );
        this.limpaData();
      } else {
        if (
          this.proc.ubs == undefined ||
          this.proc.ubs == '' ||
          this.proc.atividade == undefined ||
          this.proc.atividade == ''
        ) {
          this.modalService.showModalPerigo(
            'Todos os campos são obrigatórios',
            TipoModal.INFO
          );
        } else {
          this.proc.enviado = true;
          this.proc.detalhe = this.idDetalheNotEnviado;
          this.service.saveProcedimento(this.proc).subscribe(
            (success) => {
              this.tornaDetalheTrue();
              this.tornaProcedimentoTrue();
              this.modalService.showAModalSucesso(
                'Procedimento inserido com sucesso!',
                2000
              );
              this.cleanFormProc(form);
              this.getDetalheEnviado();
            },
            (error) =>
              this.modalService.showModalPerigo(
                'Erro interno!',
                TipoModal.PERIGO
              )
          );
        }
      }
    }
  }
}
