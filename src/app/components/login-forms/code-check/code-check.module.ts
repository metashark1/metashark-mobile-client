import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CodeCheckPageRoutingModule } from './code-check-routing.module';
import { CodeCheckPage } from './code-check.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';
import { NgFTranslatorModule } from 'src/app/services/ng-f-translator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CodeCheckPageRoutingModule,
    SimpleMaskModule,
    NgFTranslatorModule
  ],
  declarations: [CodeCheckPage]
})
export class CodeCheckPageModule {}
