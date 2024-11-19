import React, { useState } from 'react';
import { DeleteButton } from './DeleteButton';
import EditButton from './EditButton';
import { Organisation, User } from '@types';

interface UserTableProps {
    organisation: Organisation;
    loggedInUsername: string | null;
}

export const UserTable: React.FC<UserTableProps> = ({ organisation, loggedInUsername }) => {
    const [users, setUsers] = useState<User[] | undefined>(organisation.users);

    if (!organisation.users) {
        return <div>No users found</div>;
    }

    // Function to update the role of a user
    const updateUserRole = (userId: number, role: string | undefined) => {
        if (!users) {
            return;
        }
        // Update the user's role in the state
        setUsers(users.map((user) => (user.id === userId ? { ...user, role } : user)));
    };

    // Function to delete a user
    const deleteUser = (userId: number) => {
        if (!users) {
            return;
        }
        // Remove the user from the state
        setUsers(users.filter((user) => user.id !== userId));
    };

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
                            <td className="border px-4 py-2">{user.role}</td>
                            <td className="border px-4 py-2">
                                <EditButton
                                    user={user}
                                    loggedInUsername={loggedInUsername}
                                    updateUserRole={updateUserRole}
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
