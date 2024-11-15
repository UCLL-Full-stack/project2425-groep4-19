export class StockItem {
    readonly id: string;
    readonly name: string;
    quantity: number;

    constructor(stockItem: { id: string; name: string; quantity: number }) {
        this.validate(stockItem);
        this.id = stockItem.id;
        this.name = stockItem.name;
        this.quantity = stockItem.quantity;
    }

    // Validate stock item input
    validate(stockItem: { id: string; name: string; quantity: number }) {
        if (!stockItem.id?.trim()) {
            throw new Error('ID is required!');
        }
        if (!stockItem.name?.trim()) {
            throw new Error('Name is required!');
        }
        if (stockItem.quantity == null || stockItem.quantity < 0) {
            throw new Error('Quantity must be a non-negative number!');
        }
    }

    static from({ id, name, quantity }: StockItem) {
        return new StockItem({
            id,
            name,
            quantity,
        });
    }
}