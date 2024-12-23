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
    const [filteredStock, setFilteredStock] = React.useState<StockItem[]>([]);
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [isNewItemPopupVisible, setIsNewItemPopupVisible] = React.useState<boolean>(false);
    const [isEditPopupVisible, setIsEditPopupVisible] = React.useState<boolean>(false);
    const [isDeletePopUpVisible, setIsDeletePopUpVisible] = React.useState<boolean>(false);
    const [editingStockItem, setEditingStockItem] = React.useState<StockItem | null>(null);
    const [deletingStockItem, setDeletingStockItem] = React.useState<StockItem | null>(null);

    useEffect(() => {
        const orgName = sessionStorage.getItem('organisationName');
        if (orgName) {
            const parsedName = orgName.replace(/["]+/g, '');
            setOrganisationName(parsedName);
            const fetchStock = async () => {
                const stockItems = await StockItemService.getAllStockItemsOfOrganisationByOrganisationName(parsedName);
                setStock(stockItems);
                setFilteredStock(stockItems);
            };
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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        filterStock(value);
    };

    const filterStock = (searchTerm: string) => {
        let filtered = [...stock]; // Create a new array to avoid mutating the original
        
        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredStock(filtered);
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
        filterStock(searchTerm);
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
        filterStock(searchTerm);
    };

    // Update item
    const handleEditItem = async (id: number | undefined, name: string, quantity: number) => {
        // update item
        const updatedStockItem = await StockItemService.updateStockItemById(id, name, quantity);
        const updatedStock = stock.map((item) =>
            item.id === updatedStockItem.id ? updatedStockItem : item
        );
        setStock(updatedStock);
        filterStock(searchTerm);
    };

    // Delete item
    const handleDeleteItem = async (id: number | undefined) => {
        console.log('Deleting item: ', id);
        const deletedStockItem = await StockItemService.deleteStockItemById(id);
        const updatedStock = stock.filter((item) => item.id !== deletedStockItem.id);
        setStock(updatedStock);
        setIsDeletePopUpVisible(false);
        filterStock(searchTerm);
    };

    return (
        <>
            <Navbar />
            <div className="relative bg-background">
                <div className=" min-h-screen pt-3 flex flex-col items-center flex-grow ">
                    <h1 className="mt-2 text-6xl font-bold mb-12">{organisationName} - Stock</h1>
                    <div className="mb-14">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="p-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-14">
                        <AddStockItemButton onOpenPopup={handleOpenNewItemPopup} />
                    </div>
                    {stock && (
                        <StockTable
                            stock={filteredStock}
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
                    {isDeletePopUpVisible && (
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
