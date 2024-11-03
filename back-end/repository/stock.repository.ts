import { StockItem } from '../model/stockItem';

let stockItems: StockItem[] = [
    new StockItem({ id: '1', name: 'Item 1', quantity: 10 }),
    new StockItem({ id: '2', name: 'Item 2', quantity: 20 }),
    new StockItem({ id: '3', name: 'Item 3', quantity: 30 }),
    new StockItem({ id: '4', name: 'Item 4', quantity: 40 }),
    new StockItem({ id: '5', name: 'Item 5', quantity: 50 }),
];

export const getAllStockItems = (): StockItem[] => {
    return stockItems;
};

export const getStockItemById = (id: string): StockItem | undefined => {
    return stockItems.find(item => item.id === id);
};

export const updateStockItem = (id: string, quantity: number): StockItem | undefined => {
    const item = stockItems.find(item => item.id === id);
    if (item) {
        item.quantity = quantity;
        return item;
    }
    return undefined;
};