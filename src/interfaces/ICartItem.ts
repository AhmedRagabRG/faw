import { IProduct } from "./IProducts";
import { IShippable } from "./IShippable";

export interface ICartItem {
    product: IProduct & IShippable;
    quantity: number;
}