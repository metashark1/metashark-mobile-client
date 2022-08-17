import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgFTranslatorModule } from 'src/app/services/ng-f-translator';
import { MovieSingleViewPageRoutingModule } from './movie-single-view-routing.module';
import { MovieSingleViewPage } from './movie-single-view.page';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { VideoPlayerComponent } from 'src/app/components/video-player/video-player.component';
import { CommentsComponent } from 'src/app/components/comments/comments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MovieSingleViewPageRoutingModule,
    NgFTranslatorModule,
    SimpleMaskModule,
    NgxIonicImageViewerModule
  ],
  declarations: [
    MovieSingleViewPage,
    SafePipe,
    VideoPlayerComponent,
    CommentsComponent
  ],
  exports: [],
  providers: []
})
export class MovieSingleViewPageModule { }
