import { StockItem } from '../model/stockItem';
import database from '../util/database';

export const getAllStockItems = async (): Promise<StockItem[]> => {
    try {
        const stockItems = await database.stockItem.findMany();
        return stockItems.map((stockItem) => StockItem.from(stockItem));
    } catch (error) {
        throw new Error(`Error getting stock items: ${error}`);
    }
};

export const getStockItemById = async (id: number): Promise<StockItem | undefined> => {
    try {
        const stockItem = await database.stockItem.findFirst({
            where: { id: id },
        });
        return stockItem ? StockItem.from(stockItem) : undefined;
    } catch (error) {
        throw new Error(`Error getting stock item: ${error}`);
    }
};

export const updateStockItem = async (
    id: number,
    quantity: number
): Promise<StockItem | undefined> => {
    try {
        const updatedStockItem = await database.stockItem.update({
            where: { id: id },
            data: { quantity: quantity },
        });
        return StockItem.from(updatedStockItem);
    } catch (error) {
        throw new Error(`Error updating stock item: ${error}`);
    }
};
