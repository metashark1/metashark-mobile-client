import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentsAddModalPage } from './comments-add-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CommentsAddModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentsAddModalPageRoutingModule {}
