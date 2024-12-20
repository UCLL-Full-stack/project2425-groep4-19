import utils from '@services/utils';
import React, { useEffect } from 'react';

interface RoleDropdownProps {
    role: string | undefined;
    isEditing: boolean;
    selectedOption: string | undefined;
    setSelectedOption: (role: string | undefined) => void;
}

export const RoleDropdown: React.FC<RoleDropdownProps> = ({
    role,
    isEditing,
    selectedOption,
    setSelectedOption,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = event.target.value;
        setSelectedOption(newRole);
        console.log(`Selected role: ${selectedOption}`);
    };

    return (
        <>
            {isEditing ? (
                <select value={selectedOption} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                </select>
            ) : (
                <span>{utils.capitalizeFirstLetter(role)}</span>
            )}
        </>
    );
};
