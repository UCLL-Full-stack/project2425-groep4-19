import { StockItem } from '@types';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface StockTableProps {
    stock: StockItem[];
    handleChangeQuantity: (id: number | undefined, quantity: number) => void;
    handleOpenEditPopup: (stockItem: StockItem) => void;
    handleOpenDeletePopup: (stockItem: StockItem) => void;
}

const StockTable: React.FC<StockTableProps> = ({
    stock,
    handleChangeQuantity,
    handleOpenEditPopup,
    handleOpenDeletePopup,
}) => {
    const [organisationStock, setOrganisationStock] = useState<StockItem[]>([]);

    useEffect(() => {
        const sortedStock = [...stock].sort((a, b) => {
            if (!a.name || !b.name) {
                return 0;
            }
            return a.name.localeCompare(b.name);
        });
        setOrganisationStock(sortedStock);
    }, [stock]);

    if (!stock) {
        return <div>No stock found</div>;
    }

    return (
        <div className="w-full">
            {organisationStock.length > 0 && (
                <table className="mx-auto w-3/4 bg-background text-text border border-primary rounded-lg shadow-md">
                    <thead className="bg-primary text-text text-4xl font-bold">
                        <tr>
                            <th className="py-6 px-4 border-b">Name</th>
                            <th className="py-6 px-4 border-b">Quantity</th>
                            <th className="py-6 px-4 border-b">Tags</th>
                            <th className="py-6 px-4 border-b">Edit</th>
                            <th className="py-6 px-4 border-b">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {organisationStock.map((stockItem) => (
                            <tr
                                key={stockItem.id}
                                className="even:bg-gray-50 odd:bg-gray-200 text-2xl font-medium"
                            >
                                <td className="py-5 px-4 border">{stockItem.name}</td>

                                <td className="py-5 px-4 border">
                                    <form>
                                        <input
                                            type="number"
                                            className="w-1/3 text-2xl text-center border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                            defaultValue={stockItem.quantity}
                                            onChange={(e) =>
                                                handleChangeQuantity(
                                                    stockItem.id,
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                    </form>
                                </td>
                                <td className="py-5 px-4 border">
                                    {stockItem.tags && stockItem.tags.length > 0 ? (
                                        <ul className="items-center text-center flex flex-row gap-x-4">
                                            {stockItem.tags.map((tag) => (
                                                <li key={tag.id}>
                                                    <div
                                                        style={{
                                                            background: tag.color,
                                                            opacity: 0.95,
                                                        }}
                                                        className="rounded-md px-2 py-1 text-black"
                                                    >
                                                        {tag.name}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        'No tags'
                                    )}
                                </td>
                                <td>
                                    <div className="flex flex-row justify-center items-center">
                                        <div className="bg-primary flex items-center justify-center p-2 rounded-lg">
                                            <button
                                                className="text-text"
                                                onClick={() => handleOpenEditPopup(stockItem)}
                                            >
                                                <FaEdit size={40} />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-row justify-center items-center">
                                        <div className="bg-secondary flex items-center justify-center p-2 rounded-lg">
                                            <button
                                                className="text-text"
                                                onClick={() => handleOpenDeletePopup(stockItem)}
                                            >
                                                <FaTrash size={40} />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {!stock.length && (
                <div className="text-red-600 text-4xl flex justify-center items-center">
                    No stock found
                </div>
            )}
        </div>
    );
};

export default StockTable;
