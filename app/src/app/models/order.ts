import { OrderItem } from './order-item';

export class Order {
    name: string;
    address: string;
    creditCard: string;
    items: OrderItem[];

    constructor() {
        this.name = '';
        this.address = '';
        this.creditCard = '';
        this.items = [];
    }

    total(): number{
        return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }
}