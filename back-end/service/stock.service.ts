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

export default {
    getStockItems,
    updateStockItem,
    getStockItemsByOrganisationName,
    addStockItemByOrganisationName,
};
