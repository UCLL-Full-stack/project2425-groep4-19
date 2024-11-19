import React, { useState } from 'react';
import { FaBan, FaCheck, FaEdit } from 'react-icons/fa';
import { User } from '@types';

interface EditButtonProps {
    user: User;
    loggedInUsername: string | null;
    updateUserRole: (userId: number, role: string | undefined) => void;
}

const EditButton: React.FC<EditButtonProps> = ({ user, loggedInUsername, updateUserRole }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | undefined>(user.role);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCheckClick = () => {
        if (user.id !== undefined) {
            updateUserRole(user.id, selectedOption);
        }
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setSelectedOption(user.role);
    };

    const isLoggedInUser = loggedInUsername === user.username;

    return (
        <>
            {!isEditing ? (
                isLoggedInUser ? (
                    <div className="flex flex-row justify-center items-center">
                        <div className="bg-gray-400 flex items-center justify-center p-2 rounded-lg">
                            <button className="text-text opacity-50 cursor-not-allowed" disabled>
                                <FaEdit size={40} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row justify-center items-center">
                        <div className="bg-primary flex items-center justify-center p-2 rounded-lg">
                            <button className="text-text" onClick={handleEditClick}>
                                <FaEdit size={40} />
                            </button>
                        </div>
                    </div>
                )
            ) : (
                <div className="flex flex-row justify-evenly items-center">
                    <div className="bg-primary flex items-center justify-center p-2 rounded-lg">
                        <button className="text-text" onClick={handleCheckClick}>
                            <FaCheck size={40} />
                        </button>
                    </div>
                    <div className="bg-red-600 flex items-center justify-center p-2 rounded-lg">
                        <button className="text-text" onClick={handleCancelClick}>
                            <FaBan size={40} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditButton;
