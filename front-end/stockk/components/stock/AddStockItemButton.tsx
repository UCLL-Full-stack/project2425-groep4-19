import React, { useState } from 'react';

interface AddStockItemButtonProps {
    onOpenPopup: () => void;
}

export const AddStockItemButton: React.FC<AddStockItemButtonProps> = ({ onOpenPopup }) => {
    return (
        <>
            <div className="bg-primary px-7 py-4 border rounded-lg ">
                <button className="text-3xl font-semibold" type="button" onClick={onOpenPopup}>
                    Add Item
                </button>
            </div>
        </>
    );
};
