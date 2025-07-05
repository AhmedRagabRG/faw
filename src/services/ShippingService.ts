import { IShippable } from "../interfaces/IShippable";

export const ship = (items: IShippable[]) => {
    console.log(`
        ** Shipment notice **
        ${items.map(item => `
            ${item.getName()} ${item.getWeight() > 1000 ? (item.getWeight() / 1000).toFixed(1) + "kg" : item.getWeight() + "g"}
        `).join("\n")}
    `);
}
