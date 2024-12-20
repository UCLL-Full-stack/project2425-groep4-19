import { StockItem } from '../model/stockItem';
import organisationRepository from '../repository/organisation.repository';
import stockRepository from '../repository/stock.repository';

const getStockItems = async (): Promise<StockItem[]> => {
    return await stockRepository.getAllStockItems();
};

const updateStockItem = async (id: number, quantity: number): Promise<StockItem> => {
    const item = await stockRepository.updateStockItem(id, quantity);
    if (!item) {
        throw new Error('Item not found');
    }
    return item;
};

const getStockItemsByOrganisationName = async (organisationName: string): Promise<StockItem[]> => {
    const organisation = await organisationRepository.getOrganisationByName(organisationName);
    if (!organisation) {
        throw new Error('Organisation not found');
    }
    return await stockRepository.getStockItemsByOrganisationId(organisation.id);
};

const addStockItemByOrganisationName = async (
    name: string,
    quantity: number,
    organisationName: string
): Promise<StockItem> => {
    const organisation = await organisationRepository.getOrganisationByName(organisationName);
    if (!organisation) {
        throw new Error('Organisation not found');
    }
    return await stockRepository.addStockItemByOrganisationId(name, quantity, organisation.id);
};

const updateStockItemQuantityById = async (id: number, quantity: number): Promise<StockItem> => {
    return await stockRepository.updateStockItemQuantityById(id, quantity);
};

const updateStockItemById = async (
    id: number,
    name: string,
    quantity: number
): Promise<StockItem> => {
    return await stockRepository.updateStockItemById(id, name, quantity);
};

const deleteStockItemById = async (id: number): Promise<StockItem> => {
    return await stockRepository.deleteStockItemById(id);
};

export default {
    getStockItems,
    updateStockItem,
    getStockItemsByOrganisationName,
    addStockItemByOrganisationName,
    updateStockItemQuantityById,
    updateStockItemById,
    deleteStockItemById,
};
