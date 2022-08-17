import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './guest-guard.guard';
import { LoggedinGuard } from './loggedin.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoggedinGuard],
    // canLoad: [LoggedinGuard],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'auth',
    canActivate: [GuestGuard],
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'user/code-check',
    // canActivate: [GuestGuard],
    canActivate: [LoggedinGuard],
    // canLoad: [GuestGuard],
    loadChildren: () => import('./components/login-forms/code-check/code-check.module').then( m => m.CodeCheckPageModule)
  },
  {
    path: 'profile-edit',
    canActivate: [LoggedinGuard],
    loadChildren: () => import('./components/profile-form/profile-form.module').then( m => m.ProfileFormPageModule)
  },
  {
    path: 'movie/:id',
    canActivate: [LoggedinGuard],
    loadChildren: () => import('./pages/movie-single-view/movie-single-view.module').then( m => m.MovieSingleViewPageModule)
  },
  {
    path: 'user/search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'comments-add-modal',
    loadChildren: () => import('./components/comments/comments-add-modal/comments-add-modal.module').then( m => m.CommentsAddModalPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
