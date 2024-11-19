import React, { useState, useEffect } from 'react';
import { FaBan, FaCheck, FaEdit } from 'react-icons/fa';
import { User } from '@types';

interface EditButtonProps {
    user: User; // User object containing user details
    loggedInUsername: string | null; // Username of the logged-in user
    updateUserRole: (userId: number, role: string | undefined) => void; // Function to update the user's role
    setEditingUserId: (userId: number | null) => void; // Function to set the ID of the user being edited
    setSelectedRole: (role: string | undefined) => void; // Function to set the selected role in the dropdown
    editingUserId: number | null; // ID of the user currently being edited
}

const EditButton: React.FC<EditButtonProps> = ({
    user,
    loggedInUsername,
    updateUserRole,
    setEditingUserId,
    setSelectedRole,
    editingUserId,
}) => {
    // State to manage whether the user is in editing mode
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        setIsEditing(editingUserId === user.id);
    }, [editingUserId, user.id]);

    // Handle the click event for the edit button
    const handleEditClick = () => {
        console.log(`Edit button clicked for user ID: ${user.id}`);
        if (user.id !== undefined) {
            setEditingUserId(user.id); // Set the ID of the user being edited
        }
        setSelectedRole(user.role); // Set the selected role to the user's current role
    };

    // Handle the click event for the check button
    const handleCheckClick = () => {
        console.log(`Check button clicked for user ID: ${user.id}`);
        if (user.id !== undefined) {
            updateUserRole(user.id, user.role); // Update the user's role
        }
        setEditingUserId(null); // Reset the editing user ID
    };

    // Handle the click event for the cancel button
    const handleCancelClick = () => {
        console.log(`Cancel button clicked for user ID: ${user.id}`);
        setEditingUserId(null); // Reset the editing user ID
        setSelectedRole(user.role); // Reset the selected role to the user's current role
    };

    // Check if the logged-in user is the same as the user being edited
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
