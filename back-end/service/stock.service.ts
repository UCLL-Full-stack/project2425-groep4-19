import { StockItem } from '../model/stockItem';
import * as stockRepository from '../repository/stock.repository';

export const getStockItems = (): StockItem[] => {
    return stockRepository.getAllStockItems();
};

export const updateStockItem = (id: string, quantity: number): StockItem => {
    const item = stockRepository.updateStockItem(id, quantity);
    if (!item) {
        throw new Error('Item not found');
    }
    return item;
};