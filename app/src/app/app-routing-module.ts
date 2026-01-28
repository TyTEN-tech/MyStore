import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductItem } from './product-item/product-item';
import { Confirmation } from './confirmation/confirmation';
import { Cart } from './cart/cart';

const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'product/{id}', component: ProductItem },
  { path: 'cart', component: Cart },
  { path: 'confirmation', component: Confirmation },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
