import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { FilteringPipe } from '../pipes/filtering.pipe';
import { SortByPipe } from '../pipes/sort-by.pipe';
import { NgFTranslatorModule } from '../services/ng-f-translator';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { MainListComponent } from '../pages/main-list/main-list.component';
import { MovieDefCardComponent } from '../components/movie-cards/movie-def-card/movie-def-card.component';
import { MovieSquareCardComponent } from '../components/movie-cards/movie-square-card/movie-square-card.component';
import { MainSliderComponent } from '../components/main-slider/main-slider.component';
import { GenresCarouselComponent } from '../components/genres-carousel/genres-carousel.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    NgFTranslatorModule
  ],
  declarations: [
    Tab1Page,
    MainListComponent,
    MainSliderComponent,
    GenresCarouselComponent,
    FilteringPipe,
    SortByPipe,
    MovieDefCardComponent,
    MovieSquareCardComponent
  ],
  providers: [NativeAudio]
})
export class Tab1PageModule { }
