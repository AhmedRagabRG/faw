import { ICustomer } from "../interfaces/ICustomer";
import { IProduct } from "../interfaces/IProducts";
import { IShippable } from "../interfaces/IShippable";
import { Cart } from "../models/Cart";
import { ship } from "./ShippingService";

const SHIPPING_FEE = 30;

export const checkout = (customer: ICustomer, cart: Cart) => {
    let errors: string[] = [];
    if (cart.isEmpty()) {
        console.log("Cart is empty");
        return;
    }
    const shippableItems: IShippable[] = [];

    cart.getItems().forEach(item => {
        if (item.product.expirationDate && item.product.expirationDate < new Date()) {
            errors.push(`${item.product.name} is expired`);
            return;
        }

        if (item.product.quantity < item.quantity) {
            errors.push(`Not enough stock for ${item.product.name}: ${item.product.quantity} left`);
            return;
        }

        if (item.product.weight !== 0) {
            shippableItems.push(item.product);
        }
    });

    const subTotal = cart.getTotalPrice();
    const shippingFee = shippableItems.length > 0 ? SHIPPING_FEE : 0;
    const totalAmount = subTotal + shippingFee;

    if (errors.length > 0) {
        console.log(errors[0]);
        return;
    }

    if (totalAmount > customer.balance) {
        console.log(`Insufficient balance: ${customer.balance}, Total Price: ${totalAmount}`);
        return;
    }

    if (shippableItems.length > 0) {
        ship(shippableItems);
    }

    customer.balance -= totalAmount;

    console.log(`
        ** Checkout receipt **
        ${cart.getItems().map((item: any) => `
            ${item.quantity}x ${item.product.getName()} ${item.product.price * item.quantity}
        `).join("\n")}
        ----------------------
        Subtotal: ${subTotal}
        Shipping: ${shippingFee}
        Amount: ${totalAmount}
        Remaining balance: ${customer.balance}
    `);
}