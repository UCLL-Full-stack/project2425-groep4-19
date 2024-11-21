import Navbar from '@components/Header';
import StockTable from '@components/stock/StockTable';
import StockItemService from '@services/StockItemService';
import { StockItem } from '@types';
import React, { useEffect } from 'react';

export const StockPage = () => {
    const [organisationName, setOrganisationName] = React.useState<string>('');
    const [stock, setStock] = React.useState<StockItem[]>([]);

    useEffect(() => {
        const orgName = sessionStorage.getItem('organisationName');
        if (orgName) {
            // set name and remove quotes from the string
            const parsedName = orgName.replace(/["]+/g, '');

            setOrganisationName(parsedName);
            console.log('Organisation name:', parsedName);

            // fetch stock items by organisation name
            const fetchStock = async () => {
                console.log('Fetching stock for organisation:', parsedName);

                if (!parsedName) {
                    throw new Error('No organisation name');
                }

                // fetch stock items
                const stockItems =
                    await StockItemService.getAllStockItemsOfOrganisationByOrganisationName(
                        parsedName
                    );
                setStock(stockItems);
            };
            // call fetch function
            fetchStock();
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="relative bg-background">
                <div className=" min-h-screen pt-3 flex flex-col items-center flex-grow space-y-8">
                    <h1 className="mt-20 text-6xl font-bold mb-24">{organisationName} - Stock</h1>
                    {stock && <StockTable stock={stock} />}
                </div>
            </div>
        </>
    );
};

export default StockPage;
