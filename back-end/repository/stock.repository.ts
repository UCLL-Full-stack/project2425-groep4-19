import { StockItem } from '../model/stockItem';
import { StockItemTag } from '../model/stockItemTag';
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
            include: { tagRelations: { include: { stockItemTag: true } } }, // Include the tags in the query
        });
        return stockItems.map((stockItem) =>
            StockItem.from(
                stockItem,
                undefined,
                stockItem.tagRelations.map((relation) => StockItemTag.from(relation.stockItemTag))
            )
        );
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
            include: { tagRelations: { include: { stockItemTag: true } } }, // Include the tags in the query
        });
        return StockItem.from(
            updatedStockItem,
            undefined,
            updatedStockItem.tagRelations.map((relation) =>
                StockItemTag.from(relation.stockItemTag)
            )
        );
    } catch (error) {
        throw new Error(`Error updating stock item: ${error}`);
    }
};

const updateStockItemById = async (
    id: number,
    name: string,
    quantity: number
): Promise<StockItem> => {
    try {
        const updatedStockItem = await database.stockItem.update({
            where: { id: id },
            data: { name: name, quantity: quantity },
            include: { tagRelations: { include: { stockItemTag: true } } }, // Include the tags in the query
        });
        return StockItem.from(
            updatedStockItem,
            undefined,
            updatedStockItem.tagRelations.map((relation) =>
                StockItemTag.from(relation.stockItemTag)
            )
        );
    } catch (error) {
        throw new Error(`Error updating stock item: ${error}`);
    }
};

const deleteStockItemById = async (id: number): Promise<StockItem> => {
    try {
        const deletedStockItem = await getStockItemById(id);
        if (!deletedStockItem) {
            throw new Error('Stock item not found');
        }
        await database.stockItem.delete({ where: { id: id } });
        return StockItem.from(deletedStockItem);
    } catch (error) {
        throw new Error(`Error deleting stock item: ${error}`);
    }
};

export default {
    getAllStockItems,
    getStockItemById,
    updateStockItem,
    getStockItemsByOrganisationId,
    addStockItemByOrganisationId,
    updateStockItemQuantityById,
    updateStockItemById,
    deleteStockItemById,
};
