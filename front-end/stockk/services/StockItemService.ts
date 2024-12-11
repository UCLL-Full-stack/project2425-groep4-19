import { StockItem } from '@types';

//TODO should be changed to Id instead of name
const getAllStockItemsOfOrganisationByOrganisationName = async (organisationName: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(apiUrl + '/stock/' + organisationName);
    if (!response.ok) {
        throw new Error('Stock not found');
    }

    return response.json();
};

const addStockItemByOrganisationName = async (
    organisationName: string,
    name: string,
    quantity: number
) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(apiUrl + '/stock/' + organisationName, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, quantity }),
    });

    if (!response.ok) {
        throw new Error('Failed to add stock item');
    }
    return response.json();
};

export default {
    getAllStockItemsOfOrganisationByOrganisationName,
    addStockItemByOrganisationName,
};
