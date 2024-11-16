import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Header'; // Adjust the path as necessary
import StockChart from '../../components/stock/StockChart'; // Adjust the path as necessary

const Stock: React.FC = () => {
    const [stockItems, setStockItems] = useState<{ id: string; name: string; quantity: number }[]>(
        []
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch stock data from the backend
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/stock`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setStockItems(data))
            .catch((error) => {
                console.error('Error fetching stock data:', error);
                setError('Failed to fetch stock data. Please try again later.');
            });
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        // Update stock quantity in the backend
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/stock/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((updatedItem) => {
                // Update stock items in state
                setStockItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === id ? { ...item, quantity: updatedItem.quantity } : item
                    )
                );
            })
            .catch((error) => {
                console.error('Error updating stock quantity:', error);
                setError('Failed to update stock quantity. Please try again later.');
            });
    };

    const filteredItems = stockItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 flex">
                <div className="w-2/3">
                    <h1 className="text-2xl mb-4">Stock Management</h1>
                    {error && <p className="text-red-500">{error}</p>}
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border p-2 mb-4 w-full"
                    />
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">ID</th>
                                    <th className="py-2 px-4 border-b">Name</th>
                                    <th className="py-2 px-4 border-b">Quantity</th>
                                    <th className="py-2 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((item) => (
                                    <tr key={item.id}>
                                        <td className="py-2 px-4 border-b">{item.id}</td>
                                        <td className="py-2 px-4 border-b">{item.name}</td>
                                        <td className="py-2 px-4 border-b">
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                className="border p-2 w-20"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(item.id, item.quantity)
                                                }
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                            >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="w-1/3 ml-4">
                    <StockChart stockItems={filteredItems} />
                </div>
            </div>
        </>
    );
};

export default Stock;
