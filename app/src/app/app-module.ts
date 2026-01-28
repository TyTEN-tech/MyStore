import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './layouts/header/header';
import { Checkout } from './checkout/checkout';
import { Confirmation } from './confirmation/confirmation';
import { ProductItem } from './product-item/product-item';
import { ProductList } from './product-list/product-list';
import { ProductItemDetail } from './product-item-detail/product-item-detail';
import { Cart } from './cart/cart';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    App,
    Header,
    Checkout,
    Confirmation,
    ProductItem,
    ProductList,
    ProductItemDetail,
    Cart
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [App]
})
export class AppModule { }
