import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './add-users/add-users.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { AdminGuard } from '../../guards/admin.guard';
import { ProfGuard } from '../../guards/prof.guard';
import { SupGuard } from '../../guards/sup.guard';
import { ListAtendProfComponent } from './list-atend-prof/list-atend-prof.component';
import { ListAtendidosComponent } from './list-atendidos/list-atendidos.component';
import { ListDescartadosComponent } from './list-descartados/list-descartados.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListValidadosComponent } from './list-validados/list-validados.component';
import { NewAgendadosComponent } from './new-agendados/new-agendados.component';
import { ProcedimentosFormComponent } from './procedimentos-form/procedimentos-form.component';

const routes: Routes = [
  {
    path: 'form',
    component: ProcedimentosFormComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'add',
    component: AddUsersComponent,
    /* o Guard abaixo deve ser descomentado assim que for cadastrado o primeiro usuário, pois apenas 
    admin devem cadastrar novos usuários, isso é apenas para facilitar a primeira inserção ao baixar esse código. 
    Lembrando que no model de "user" la no backend o default deve ser mudado de "admin" para outro perfil com menos funcionalidade. 
    Outra alteração importante é remover do template de login o link para cadastrar usuários... Pois como já dito, 
    só admin deve realizar cadastros de novos usuários...*/

    //canActivate: [AdminGuard],
  },
  {
    path: 'list',
    component: ListUsersComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'validados',
    component: ListValidadosComponent,
    canActivate: [SupGuard],
  },
  {
    path: 'atendidos-false',
    component: ListAtendProfComponent,
    canActivate: [ProfGuard],
  },
  {
    path: 'atendidos-true',
    component: ListAtendidosComponent,
    canActivate: [ProfGuard],
  },
  {
    path: 'descartados',
    component: ListDescartadosComponent,
    canActivate: [SupGuard],
  },
  {
    path: 'new-usuarios',
    component: NewAgendadosComponent,
    canActivate: [SupGuard],
  },
  {
    path: 'login',
    component: FormLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
