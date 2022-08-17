import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthPageRoutingModule } from './auth-routing.module';
import { AuthPage } from './auth.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';
import { NgFTranslatorModule } from '../../services/ng-f-translator';
import { GreetingComponent } from '../../components/greeting/greeting.component';
import { RegistrationComponent } from '../../components/login-forms/registration/registration.component';
import { AuthComponent } from '../../components/login-forms/auth/auth.component';
import { RestoreComponent } from '../../components/login-forms/restore/restore.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthPageRoutingModule,
    SimpleMaskModule,
    NgFTranslatorModule
  ],
  declarations: [AuthPage, GreetingComponent, RegistrationComponent, AuthComponent, RestoreComponent]
})
export class AuthPageModule {}
