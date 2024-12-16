import { StockItem as StockItemPrisma } from '@prisma/client';
import { Organisation } from './organisation';
import { StockItemTag } from './stockItemTag';

export class StockItem {
    readonly id: number;
    readonly name: string;
    readonly quantity: number;
    readonly organisationId: number | null;
    readonly organisation?: Organisation;
    readonly tags?: StockItemTag[];

    constructor(stockItem: {
        id: number;
        name: string;
        quantity: number;
        organisationId: number | null;
        organisation?: Organisation;
        tags?: StockItemTag[];
    }) {
        this.validate(stockItem);
        this.id = stockItem.id;
        this.name = stockItem.name;
        this.quantity = stockItem.quantity;
        this.organisationId = stockItem.organisationId;
        this.organisation = stockItem.organisation;
        this.tags = stockItem.tags;
    }

    // Validate stock item input
    validate(stockItem: { id: number; name: string; quantity: number }) {
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

    static from(
        { id, name, quantity, organisationId }: StockItemPrisma,
        organisation?: Organisation,
        stockItemTags?: StockItemTag[]
    ): StockItem {
        return new StockItem({
            id,
            name,
            quantity,
            organisationId: organisationId ?? null,
            organisation: organisation ?? undefined,
            tags: stockItemTags ?? undefined,
        });
    }
}
