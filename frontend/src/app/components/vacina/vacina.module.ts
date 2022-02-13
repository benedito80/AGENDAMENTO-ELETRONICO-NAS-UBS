import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-Text-Mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeComponent } from './home/home.component';
import { VacinaFormComponent } from './vacina-form/vacina-form.component';
import { VacinaRoutingModule } from './vacina-routing.module';
import { BuscaAgendamentoComponent } from './busca-agendamento/busca-agendamento.component';

@NgModule({ 
  declarations: [VacinaFormComponent, HomeComponent, BuscaAgendamentoComponent],
  imports: [
    CommonModule,
    VacinaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TextMaskModule,
  ],
})
export class VacinaModule {}
