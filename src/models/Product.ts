import { IProduct } from "../interfaces/IProducts";
import { IShippable } from "../interfaces/IShippable";

class Product implements IProduct, IShippable {
    name: string;
    price: number;
    quantity: number;
    expirationDate?: Date | undefined;
    weight: number;

    constructor(name: string, price: number, quantity: number, weight?: number, expirationDate?: Date) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.weight = weight || 0;
        this.expirationDate = expirationDate;
    }

    getName(): string {
        return this.name;
    }

    getWeight(): number {
        return this.weight;
    }
}

export default Product;