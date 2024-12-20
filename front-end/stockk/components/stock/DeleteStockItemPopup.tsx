import { StockItem } from '@types';
import React from 'react';

interface DeleteStockItemPopupProps {
    handleClosePopup: () => void;
    stockItem: StockItem | null;
    handleDeleteItem: (id: number | undefined) => void;
}

export const DeleteStockItemPopup: React.FC<DeleteStockItemPopupProps> = ({
    handleClosePopup,
    stockItem,
    handleDeleteItem,
}) => {
    const id = stockItem?.id;
    const name = stockItem?.name;
    const quantity = stockItem?.quantity;
    const [error, setError] = React.useState<string>('');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg relative w-1/2">
                <button
                    className="absolute top-2 right-2 text-3xl font-bold mr-2"
                    onClick={handleClosePopup}
                >
                    &times;
                </button>
                <h1 className="text-5xl font-bold text-center mt-4">Delete Stock Item</h1>
                <p className="text-3xl font-medium text-center mt-6">
                    Are you sure you want to delete this item?
                </p>
                <p className="text-4xl font-semibold text-center mt-6">
                    {name} - Quantity: {quantity}
                </p>
                {error && <p className="text-red-600 mt-4">{error}</p>}
                <div className="flex justify-evenly mt-10">
                    <button
                        className="bg-primary px-7 py-4 border rounded-lg text-2xl font-bold"
                        onClick={() => handleDeleteItem(id)}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-red-600 px-7 py-4 border rounded-lg text-2xl font-bold"
                        type="button"
                        onClick={handleClosePopup}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
