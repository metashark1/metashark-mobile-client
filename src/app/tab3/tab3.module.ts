import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module'
import { NgFTranslatorModule } from '../services/ng-f-translator';
import { ProfileViewModule } from '../components/profile-view/profile-view.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ProfileViewModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    NgFTranslatorModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
