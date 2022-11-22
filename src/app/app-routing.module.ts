import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { OthersComponent } from './components/others/others.component';
import { PeopleComponent } from './components/people/people.component';
import { PreviewComponent } from './components/preview/preview.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'people',
    component: PeopleComponent
  },
  {
    path: 'preview',
    canActivate: [AuthGuard],
    component: PreviewComponent
  },
  {
    path: 'others',
    component: OthersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
