import { Component, OnInit, Input, Output, ChangeDetectorRef } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product-service';
import { CartService } from '../services/cart-service';
import { OrderItem } from '../models/order-item';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList implements OnInit {
  products: Product[] = [];
  @Output() cart: OrderItem[] = [];
  
  constructor(private productsSvc: ProductService, private cartSvc: CartService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.productsSvc.getProducts().subscribe({
      next: (data: Product[]) => {
        console.log('Products length:', data.length);
        this.products = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading products:', error);
      },
      complete: () => {
        console.log('Product loading complete');
      }
    });

    this.cart = this.cartSvc.getCart();
  }

  addToCart(product: Product, quantity: number = 1) {
    alert(`${quantity} ${product.name} added to cart`);
    this.cartSvc.addToCart(product, quantity);
  }
}
