import { StockItemTag as StockItemTagPrisma } from '@prisma/client';

export class StockItemTag {
    readonly id: number;
    readonly name: string;
    readonly color: string;

    constructor(stockItemTag: { id: number; name: string; color: string }) {
        this.validate(stockItemTag);
        this.id = stockItemTag.id;
        this.name = stockItemTag.name;
        this.color = stockItemTag.color;
    }

    // Validate stock item tag input
    validate(stockItemTag: { id: number; name: string; color: string }) {
        if (!stockItemTag.id) {
            throw new Error('ID is required!');
        }
        if (!stockItemTag.name?.trim()) {
            throw new Error('Name is required!');
        }
        if (!stockItemTag.color?.trim()) {
            throw new Error('Color is required!');
        }
    }

    static from({ id, name, color }: StockItemTagPrisma): StockItemTag {
        return new StockItemTag({ id, name, color });
    }
}
