import { User } from '@types';
import React from 'react';
import { FaTrash } from 'react-icons/fa';

interface DeleteButtonProps {
    user: User;
    loggedInUsername: string | null;
    deleteUser: (userId: number) => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
    user,
    loggedInUsername,
    deleteUser,
}) => {
    const handleDeleteClick = () => {
        if (user.id !== undefined) {
            deleteUser(user.id);
        }
    };

    return (
        <>
            <div className="flex flex-row justify-center items-center">
                {loggedInUsername !== user.username ? (
                    <div className="bg-secondary flex items-center justify-center p-2 rounded-lg">
                        <button className="text-text" onClick={handleDeleteClick}>
                            <FaTrash size={40} />
                        </button>
                    </div>
                ) : (
                    <div className="bg-gray-400 flex items-center justify-center p-2 rounded-lg">
                        <button className="text-text opacity-50 cursor-not-allowed" disabled>
                            <FaTrash size={40} />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
