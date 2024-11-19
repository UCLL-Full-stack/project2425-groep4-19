import React, { useState } from 'react';
import { DeleteButton } from './DeleteButton';
import EditButton from './EditButton';
import { Organisation, User } from '@types';
import { RoleDropdown } from './RoleDropdown';

// Define the props for the UserTable component
interface UserTableProps {
    organisation: Organisation; // Organisation object containing users
}

// UserTable component definition
export const UserTable: React.FC<UserTableProps> = ({ organisation }) => {
    // State to manage the list of users
    const [users, setUsers] = useState<User[] | undefined>(organisation.users);
    // State to manage the ID of the user being edited
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    // State to manage the selected role in the dropdown
    const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);

    // If there are no users in the organisation, display a message
    if (!organisation.users) {
        return <div>No users found</div>;
    }

    // Function to update the role of a user
    const updateUserRole = (userId: number, role: string | undefined) => {
        if (!users) {
            return;
        }
        // Update the user's role in the state
        //TODO not necessary - just update the user in the backend
        setUsers(users.map((user) => (user.id === userId ? { ...user, role } : user)));
        // Reset the editing user
        setEditingUserId(null);
    };

    // Function to delete a user
    const deleteUser = (userId: number) => {
        if (!users) {
            return;
        }
        // Remove the user from the state
        setUsers(users.filter((user) => user.id !== userId));
    };

    // Get the username of the logged-in user
    const unParsedName = sessionStorage.getItem('username');
    const loggedInUsername = unParsedName ? unParsedName.replace(/["]+/g, '') : null;

    return (
        <table className="w-3/5 mx-auto bg-background text-text border border-primary rounded-lg shadow-md">
            <thead className="bg-primary text-background">
                <tr>
                    <th className="py-2 px-4 border-b">Username</th>
                    <th className="py-2 px-4 border-b">Role</th>
                    <th className="py-2 px-4 border-b">Edit</th>
                    <th className="py-2 px-4 border-b">Delete</th>
                </tr>
            </thead>
            <tbody>
                {users &&
                    users.map((user) => (
                        <tr key={user.id} className="even:bg-gray-50 odd:bg-gray-200">
                            <td className="border px-4 py-2 ">{user.username}</td>
                            <td className="border px-4 py-2">
                                <RoleDropdown
                                    role={user.role}
                                    isEditing={editingUserId === user.id}
                                    selectedOption={selectedRole}
                                    setSelectedOption={setSelectedRole}
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <EditButton
                                    user={user}
                                    loggedInUsername={loggedInUsername}
                                    updateUserRole={updateUserRole}
                                    setEditingUserId={setEditingUserId}
                                    setSelectedRole={setSelectedRole}
                                    editingUserId={editingUserId}
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <DeleteButton
                                    user={user}
                                    loggedInUsername={loggedInUsername}
                                    deleteUser={deleteUser}
                                />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default UserTable;
