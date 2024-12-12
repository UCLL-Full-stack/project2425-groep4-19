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

const updateStockItemQuantityById = async (id: number | undefined, quantity: number) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!id) {
        throw new Error('No stock item id');
    }
    const response = await fetch(apiUrl + '/stock/updateQuantity/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
        throw new Error('Failed to update stock item quantity');
    }
    return response.json();
};

const updateStockItemById = async (id: number | undefined, name: string, quantity: number) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!id) {
        throw new Error('No stock item id');
    }
    const response = await fetch(apiUrl + '/stock/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, quantity }),
    });

    if (!response.ok) {
        throw new Error('Failed to update stock item');
    }
    return response.json();
};

export default {
    getAllStockItemsOfOrganisationByOrganisationName,
    addStockItemByOrganisationName,
    updateStockItemQuantityById,
    updateStockItemById,
};
