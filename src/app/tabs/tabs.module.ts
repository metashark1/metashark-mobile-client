import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { NgFTranslatorModule } from '../services/ng-f-translator';
import { SearchboxComponent } from '../components/searchbox/searchbox.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    NgFTranslatorModule
  ],
  declarations: [TabsPage, SearchboxComponent]
})
export class TabsPageModule {}
