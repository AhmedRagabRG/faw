import { ICartItem } from "../interfaces/ICartItem";
import { IProduct } from "../interfaces/IProducts";
import { IShippable } from "../interfaces/IShippable";

export class Cart {
    private items: ICartItem[] = [];

    getItems(): ICartItem[] {
        return this.items;
    }

    add(product: IProduct & IShippable, quantity: number) {
        if (quantity <= 0) {
            console.log(`You must write a valid quantity: ${quantity}`);
            return;
        }

        if (product.quantity < quantity) {
            console.log(`Not enough stock for ${product.name}: ${product.quantity} left`);
            return;
        }

        const existingItem = this.items.find(item => item.product.name === product.name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
    }

    getTotalPrice() {
        return this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    }

    isEmpty() {
        return this.items.length <= 0;
    }
}