import Navbar from '@components/Header';
import { AddStockItemButton } from '@components/stock/AddStockItemButton';
import { AddStockItemPopup } from '@components/stock/AddStockItemPopup';
import { DeleteStockItemPopup } from '@components/stock/DeleteStockItemPopup';
import { EditStockItemPopup } from '@components/stock/EditStockItemPopup';
import StockTable from '@components/stock/StockTable';
import StockItemService from '@services/StockItemService';
import { StockItem } from '@types';
import React, { useEffect, useState } from 'react';

export const StockPage = () => {
    const [organisationName, setOrganisationName] = React.useState<string>('');
    const [stock, setStock] = React.useState<StockItem[]>([]);
    const [isNewItemPopupVisible, setIsNewItemPopupVisible] = useState(false);
    const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
    const [editingStockItem, setEditingStockItem] = useState<StockItem | null>(null);
    const [IsDeletePopUpVisible, setIsDeletePopUpVisible] = useState(false);
    const [deletingStockItem, setDeletingStockItem] = useState<StockItem | null>(null);

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
        setIsNewItemPopupVisible(true);
    };

    const handleCloseNewItemPopup = () => {
        setIsNewItemPopupVisible(false);
    };

    // Edit item popup
    const handleOpenEditPopup = (stockItem: StockItem) => {
        setIsEditPopupVisible(true);
        setEditingStockItem(stockItem);
    };

    const handleCloseEditPopup = () => {
        setIsEditPopupVisible(false);
        setEditingStockItem(null);
    };

    // Delete item popup
    const handleOpenDeletePopup = (stockItem: StockItem) => {
        setIsDeletePopUpVisible(true);
        setDeletingStockItem(stockItem);
    };

    const handleCloseDeletePopup = () => {
        setIsDeletePopUpVisible(false);
        setDeletingStockItem(null);
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
        if (quantity === undefined || Number.isNaN(quantity)) {
            quantity = 0;
        }
        const updatedStockItem = await StockItemService.updateStockItemQuantityById(id, quantity);
        const updatedStock = stock.map((item) =>
            item.id === updatedStockItem.id ? updatedStockItem : item
        );
        setStock(updatedStock);
    };

    // Update item
    const handleEditItem = async (id: number | undefined, name: string, quantity: number) => {
        // update item
        const updatedStockItem = await StockItemService.updateStockItemById(id, name, quantity);
        const updatedStock = stock.map((item) =>
            item.id === updatedStockItem.id ? updatedStockItem : item
        );
        setStock(updatedStock);
    };

    // Delete item
    const handleDeleteItem = async (id: number | undefined) => {
        console.log('Deleting item: ', id);
        const deletedStockItem = await StockItemService.deleteStockItemById(id);
        const updatedStock = stock.filter((item) => item.id !== deletedStockItem.id);
        setStock(updatedStock);
        setIsDeletePopUpVisible(false);
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
                        <StockTable
                            stock={stock}
                            handleChangeQuantity={handleChangeQuantity}
                            handleOpenEditPopup={handleOpenEditPopup}
                            handleOpenDeletePopup={handleOpenDeletePopup}
                        />
                    )}
                    {isNewItemPopupVisible && (
                        <AddStockItemPopup
                            handleClosePopup={handleCloseNewItemPopup}
                            handleAddNewItem={handleAddNewItem}
                        />
                    )}
                    {isEditPopupVisible && (
                        <EditStockItemPopup
                            handleClosePopup={handleCloseEditPopup}
                            stockItem={editingStockItem}
                            handleEditItem={handleEditItem}
                        />
                    )}
                    {IsDeletePopUpVisible && (
                        <DeleteStockItemPopup
                            handleClosePopup={handleCloseDeletePopup}
                            stockItem={deletingStockItem}
                            handleDeleteItem={handleDeleteItem}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default StockPage;
