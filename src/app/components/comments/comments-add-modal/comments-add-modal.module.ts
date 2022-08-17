import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommentsAddModalPageRoutingModule } from './comments-add-modal-routing.module';
import { CommentsAddModalPage } from './comments-add-modal.page';
import { NgFTranslatorModule } from 'src/app/services/ng-f-translator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommentsAddModalPageRoutingModule,
    NgFTranslatorModule
  ],
  declarations: [CommentsAddModalPage]
})
export class CommentsAddModalPageModule {}
