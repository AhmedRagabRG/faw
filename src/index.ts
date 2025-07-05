import { Cart } from "./models/Cart";
import Product from "./models/Product";
import { checkout } from "./services/CheckoutService";

const customer = {
    name: "Ahmed",
    balance: 100000
}

const cheese = new Product("cheese", 50, 10, 400, new Date(2025, 7, 12));
const tv = new Product("tv", 1000, 10, 2000);
const scratchCard = new Product("scratchCard", 100, 5);

const cart = new Cart();
cart.add(cheese, 2);
cart.add(tv, 22);
cart.add(scratchCard, 1);
checkout(customer, cart);

