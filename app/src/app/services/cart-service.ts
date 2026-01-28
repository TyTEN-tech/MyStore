import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { OrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //cart: [item: Product, quantity: number][] = [];
  cart: OrderItem[] = [];

  getCart() {
    return this.cart;
  }

  addToCart(item: Product, quantity: number = 1) {
    //this.cart.push([item, quantity]);
    const orderItem = new OrderItem();
    orderItem.product = item;
    orderItem.quantity = quantity;
    this.cart.push(orderItem);
    //console.log('Item added to cart:', item);
  }

  updateCart(item: Product, quantity: number) {
    // find item in cart
    const index = this.cart.findIndex(cartItem => cartItem.product.id === item.id);
    if (index !== -1) {
      if (quantity > 0) {
        this.cart[index] = new OrderItem();
        this.cart[index].product = item;
        this.cart[index].quantity = quantity;
      } else {
        this.cart.splice(index, 1);
      }
    } else {
      this.addToCart(item, quantity);
    }
  }

  removeFromCart(item: Product) {
    const index = this.cart.findIndex(cartItem => cartItem.product.id === item.id);
    if (index !== -1) this.cart.splice(index, 1);
  }

  clearCart() {
    this.cart = [];
    console.log('Cart cleared');
  }
}
