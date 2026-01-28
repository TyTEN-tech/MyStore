import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  order: Order = new Order();

  clear(){
    this.order = new Order();
  }
}
