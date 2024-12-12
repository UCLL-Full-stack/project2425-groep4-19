import Navbar from '@components/Header';
import { AddStockItemButton } from '@components/stock/AddStockItemButton';
import { AddStockItemPopup } from '@components/stock/AddStockItemPopup';
import StockTable from '@components/stock/StockTable';
import StockItemService from '@services/StockItemService';
import { StockItem } from '@types';
import React, { useEffect, useState } from 'react';

export const StockPage = () => {
    const [organisationName, setOrganisationName] = React.useState<string>('');
    const [stock, setStock] = React.useState<StockItem[]>([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

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

    // New item popup
    const handleOpenNewItemPopup = () => {
        setIsPopupVisible(true);
    };

    const handleCloseNewItemPopup = () => {
        setIsPopupVisible(false);
    };

    // Add new item
    const handleAddNewItem = async (name: string, quantity: number) => {
        console.log('Adding new item:', name, quantity);

        // add new item
        const newItem = await StockItemService.addStockItemByOrganisationName(
            organisationName,
            name,
            quantity
        );
        setStock([...stock, newItem]);
    };

    // Update item quantity
    const handleChangeQuantity = async (id: number | undefined, quantity: number) => {
        const updatedStockItem = await StockItemService.updateStockItemQuantityById(id, quantity);
        const updatedStock = stock.map((item) =>
            item.id === updatedStockItem.id ? updatedStockItem : item
        );
        setStock(updatedStock);
    };

    return (
        <>
            <Navbar />
            <div className="relative bg-background">
                <div className=" min-h-screen pt-3 flex flex-col items-center flex-grow ">
                    <h1 className="mt-2 text-6xl font-bold mb-12">{organisationName} - Stock</h1>
                    <div className="mb-14">
                        <AddStockItemButton onOpenPopup={handleOpenNewItemPopup} />
                    </div>
                    {stock && (
                        <StockTable stock={stock} handleChangeQuantity={handleChangeQuantity} />
                    )}
                    {isPopupVisible && (
                        <AddStockItemPopup
                            handleClosePopup={handleCloseNewItemPopup}
                            handleAddNewItem={handleAddNewItem}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default StockPage;
