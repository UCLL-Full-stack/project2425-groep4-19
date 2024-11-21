import { StockItem } from '@types';
import React, { useEffect, useState } from 'react';

interface StockTableProps {
    stock: StockItem[];
}

const StockTable: React.FC<StockTableProps> = ({ stock }) => {
    const [organisationStock, setOrganisationStock] = useState<StockItem[]>([]);

    useEffect(() => {
        setOrganisationStock(stock);
    }, [stock]);

    if (!stock) {
        return <div>No stock found</div>;
    }

    return (
        <div className="w-full">
            {stock.length > 0 && (
                <table className="mx-auto w-3/4 bg-background text-text border border-primary rounded-lg shadow-md">
                    <thead className="bg-primary text-text text-4xl font-bold">
                        <tr>
                            <th className="py-6 px-4 border-b">Name</th>
                            <th className="py-6 px-4 border-b">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stock.map((stockItem) => (
                            <tr
                                key={stockItem.id}
                                className="even:bg-gray-50 odd:bg-gray-200 text-2xl font-medium"
                            >
                                <td className="py-5 px-4 border">{stockItem.name}</td>
                                <td className="py-5 px-4 border">{stockItem.quantity}</td>
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
