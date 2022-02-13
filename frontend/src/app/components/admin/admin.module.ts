import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-Text-Mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddUsersComponent } from './add-users/add-users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormLoginComponent } from './form-login/form-login.component';
import { ListAtendidosComponent } from './list-atendidos/list-atendidos.component';
import { ListDescartadosComponent } from './list-descartados/list-descartados.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListValidadosComponent } from './list-validados/list-validados.component';
import { NewAgendadosComponent } from './new-agendados/new-agendados.component';
import { ProcedimentosFormComponent } from './procedimentos-form/procedimentos-form.component';
import { ListAtendProfComponent } from './list-atend-prof/list-atend-prof.component';

@NgModule({
  declarations: [
    ProcedimentosFormComponent,
    AddUsersComponent,
    ListUsersComponent,
    FormLoginComponent,
    ListValidadosComponent,
    NewAgendadosComponent,
    ListDescartadosComponent,
    ListAtendidosComponent,
    ListAtendProfComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class AdminModule {}
