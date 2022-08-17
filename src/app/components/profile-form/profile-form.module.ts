import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileFormPageRoutingModule } from './profile-form-routing.module';
import { ProfileFormPage } from './profile-form.page';
import { NgFTranslatorModule } from 'src/app/services/ng-f-translator';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfileFormPageRoutingModule,
    NgFTranslatorModule,
    SimpleMaskModule
  ],
  declarations: [
    ProfileFormPage
  ]
})
export class ProfileFormPageModule { }
