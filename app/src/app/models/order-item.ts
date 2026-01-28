import { Product } from './product';

export class OrderItem {
    product: Product;
    quantity: number;

    constructor() {
        this.product = new Product();
        this.quantity = 0;
    }
}