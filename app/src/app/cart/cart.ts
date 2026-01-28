import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { CartService } from '../services/cart-service';
import { OrderService } from '../services/order-service';
import { OrderItem } from '../models/order-item';
import { Order } from '../models/order';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  //cart: [Product, number][] = [];
  cart: OrderItem[] = [];

  constructor(
    private cartSvc: CartService,
    private orderSvc: OrderService,
    private router: Router
  ) {
    this.cart = this.cartSvc.getCart();
  }

  updateCart(product: Product, newQuantity: string): void {
    const quantity = parseInt(newQuantity, 10);
    if (quantity > 0) {
      const cartItem = this.cart.find(item => item.product.id === product.id);
      if (cartItem) cartItem.quantity = quantity;
    } else {
      this.cartSvc.removeFromCart(product);
      alert(`${product.name} removed from cart`);
    }
  }

  calculateTotal(): number {
    return this.cart.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  onSubmit(formData: any): void {
    const order = new Order();
    order.name = formData.name;
    order.address = formData.address;
    order.creditCard = formData.creditCard;
    order.items = this.cart;

    this.orderSvc.order = order;
    this.cartSvc.clearCart();
    this.router.navigate(['/confirmation']);
  }
}
