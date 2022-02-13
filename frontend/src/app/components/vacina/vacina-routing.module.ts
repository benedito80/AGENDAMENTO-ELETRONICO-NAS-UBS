import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscaAgendamentoComponent } from './busca-agendamento/busca-agendamento.component';
import { HomeComponent } from './home/home.component';
import { VacinaFormComponent } from './vacina-form/vacina-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'formulario',
    component: VacinaFormComponent,
  },
  {
    path: 'agendamentos',
    component: BuscaAgendamentoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacinaRoutingModule {}
