import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab4PageRoutingModule } from './tab4-routing.module';
import { Tab4Page } from './tab4.page';
import { FavouriteComponent } from '../components/favourite-list/favourite.component';
import { NgFTranslatorModule } from '../services/ng-f-translator';
import { MovieDefCardComponent } from '../components/movie-cards/movie-def-card/movie-def-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    NgFTranslatorModule
  ],
  declarations: [Tab4Page, FavouriteComponent, MovieDefCardComponent]
})
export class Tab4PageModule {}
