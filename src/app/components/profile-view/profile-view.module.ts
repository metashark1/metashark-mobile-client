import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgFTranslatorModule } from 'src/app/services/ng-f-translator';
import { ProfileViewComponent } from './profile-view.component';
import { RouterModule } from '@angular/router';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NgFTranslatorModule,
    FormsModule,
    RouterModule,
    SimpleMaskModule
  ],
  declarations: [
    ProfileViewComponent
  ],
  exports: [ProfileViewComponent]
})
export class ProfileViewModule { }
