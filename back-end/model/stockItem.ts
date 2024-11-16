import { StockItem as StockItemPrisma } from '@prisma/client';

export class StockItem {
    readonly id?: number;
    readonly name: string;
    readonly quantity: number;

    constructor(stockItem: { id?: number; name: string; quantity: number }) {
        this.validate(stockItem);
        this.id = stockItem.id;
        this.name = stockItem.name;
        this.quantity = stockItem.quantity;
    }

    // Validate stock item input
    validate(stockItem: { id?: number; name: string; quantity: number }) {
        if (!stockItem.id) {
            throw new Error('ID is required!');
        }
        if (!stockItem.name?.trim()) {
            throw new Error('Name is required!');
        }
        if (stockItem.quantity == null || stockItem.quantity < 0) {
            throw new Error('Quantity must be a non-negative number!');
        }
    }

    static from({ id, name, quantity }: StockItemPrisma): StockItem {
        return new StockItem({
            id,
            name,
            quantity,
        });
    }
}
