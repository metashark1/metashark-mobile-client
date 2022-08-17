import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeCheckPage } from './code-check.page';

const routes: Routes = [
  {
    path: '',
    component: CodeCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeCheckPageRoutingModule {}
