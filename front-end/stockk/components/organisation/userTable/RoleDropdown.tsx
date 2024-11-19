import React from 'react';

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
        setSelectedOption(event.target.value);
    };

    return (
        <>
            {isEditing ? (
                <select value={selectedOption} onChange={handleChange}>
                    <option value="User">User</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select>
            ) : (
                <span>{role}</span>
            )}
        </>
    );
};
