import React, { useState } from 'react';

interface AddStockItemPopupProps {
    handleClosePopup: () => void;
    handleAddNewItem: (name: string, quantity: number) => void;
}

export const AddStockItemPopup: React.FC<AddStockItemPopupProps> = ({
    handleClosePopup,
    handleAddNewItem,
}) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState<string>('');
    const [error, setError] = useState<string>('');

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        const parsedQuantity = parseInt(quantity as string);
        // check if name and quantity are provided
        if (!name || !quantity) {
            setError('Please provide a name and quantity');
            return;
        }
        if (!isNaN(parsedQuantity)) {
            handleAddNewItem(name, parsedQuantity);
            handleClosePopup();
        } else {
            setError('Quantity must be a number');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg relative w-1/3">
                <button
                    className="absolute top-2 right-2 text-3xl font-bold mr-2"
                    onClick={handleClosePopup}
                >
                    &times;
                </button>
                <h1 className="text-5xl font-bold text-center mt-4">Add Stock Item</h1>
                <form className="mt-8" onSubmit={onSubmit}>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        {error && <p className="text-red-600 mt-4">{error}</p>}
                    </div>
                    <div className="flex justify-evenly mt-10">
                        <button
                            className="bg-primary px-7 py-4 border rounded-lg text-2xl font-bold"
                            type="submit"
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
                </form>
            </div>
        </div>
    );
};