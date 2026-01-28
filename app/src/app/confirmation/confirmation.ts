import { Component } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order-service';

@Component({
  selector: 'app-confirmation',
  standalone: false,
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation {
  order: Order;

  constructor(private orderSvc: OrderService) {
    // Get order from service
    this.order = this.orderSvc.order;
  }
}
