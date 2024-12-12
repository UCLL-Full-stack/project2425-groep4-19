import { StockItem } from '../model/stockItem';
import database from '../util/database';

const getAllStockItems = async (): Promise<StockItem[]> => {
    try {
        const stockItems = await database.stockItem.findMany();
        return stockItems.map((stockItem) => StockItem.from(stockItem));
    } catch (error) {
        throw new Error(`Error getting stock items: ${error}`);
    }
};

const getStockItemById = async (id: number): Promise<StockItem | undefined> => {
    try {
        const stockItem = await database.stockItem.findFirst({
            where: { id: id },
        });
        return stockItem ? StockItem.from(stockItem) : undefined;
    } catch (error) {
        throw new Error(`Error getting stock item: ${error}`);
    }
};

const updateStockItem = async (id: number, quantity: number): Promise<StockItem | undefined> => {
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
function getOrganisationByName(organisationName: string) {
    throw new Error('Function not implemented.');
}

const getStockItemsByOrganisationId = async (organisationId: number): Promise<StockItem[]> => {
    try {
        const stockItems = await database.stockItem.findMany({
            where: { organisationId: organisationId },
        });
        return stockItems.map((stockItem) => StockItem.from(stockItem));
    } catch (error) {
        throw new Error(`Error getting stock items: ${error}`);
    }
};

const addStockItemByOrganisationId = async (
    name: string,
    quantity: number,
    organisationId: number
): Promise<StockItem> => {
    try {
        const newStockItem = await database.stockItem.create({
            data: {
                name: name,
                quantity: quantity,
                organisationId: organisationId,
            },
        });
        return StockItem.from(newStockItem);
    } catch (error) {
        throw new Error(`Error adding stock item: ${error}`);
    }
};

const updateStockItemQuantityById = async (id: number, quantity: number): Promise<StockItem> => {
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

export default {
    getAllStockItems,
    getStockItemById,
    updateStockItem,
    getStockItemsByOrganisationId,
    addStockItemByOrganisationId,
    updateStockItemQuantityById,
};
