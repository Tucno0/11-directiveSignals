import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products', // localhost:4200/products
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'signals', // localhost:4200/signals
    loadChildren: () => import('./signals/signals.module').then(m => m.SignalsModule)
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
