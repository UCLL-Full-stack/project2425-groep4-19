import { StockItem } from '../model/stockItem';
import * as stockRepository from '../repository/stock.repository';

export const getStockItems = async (): Promise<StockItem[]> => {
    return await stockRepository.getAllStockItems();
};

export const updateStockItem = async (id: number, quantity: number): Promise<StockItem> => {
    const item = await stockRepository.updateStockItem(id, quantity);
    if (!item) {
        throw new Error('Item not found');
    }
    return item;
};
