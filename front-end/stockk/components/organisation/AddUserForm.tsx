import UserService from '@services/UserService';
import React from 'react';

interface AddUserFormProps {
    onCancel: () => void;
}

export const AddUserForm: React.FC<AddUserFormProps> = ({ onCancel }) => {
    const [username, setUsername] = React.useState('');
    const [userError, setUserError] = React.useState('');
    const [addUserError, setAddUserError] = React.useState('');

    const validate = () => {
        let result = true;
        if (username.length === 0) {
            setUserError('User does not exist');
            result = false;
        }
        return result;
    };

    const clearErrors = () => {
        setUserError('');
        setAddUserError('');
    };

    const handleAddUser = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        const validateBool = validate();
        if (!validateBool) {
            return;
        }

        try {
            // get user to check it exists
            const foundUser = await UserService.getUserByUsername(username);
            onCancel();
        } catch (error) {
            setAddUserError('User could not be added');
        }
    };

    return (
        <>
            <div className="flex flex-col space-x-4 items-center justify-center space-y-8 pt-12">
                <p className="text-4xl font-bold">Add user</p>
                <form onSubmit={handleAddUser}>
                    <div className="flex flex-col space-y-4 items-center justify-center">
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            style={{ width: '300px' }}
                            className="px-4 py-3 text-3xl bg-gray-200 rounded-lg text-text placeholder-text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                        <div className="flex flex-row space-x-4 items-center justify-center">
                            <div className="bg-primary px-7 py-5 border rounded-lg">
                                <button className="text-2xl font-bold" type="submit">
                                    Confirm
                                </button>
                            </div>
                            <div className="bg-secondary px-7 py-5 border rounded-lg">
                                <button className="text-2xl font-bold" onClick={() => onCancel()}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <p className="text-red-600">{addUserError}</p>
            </div>
        </>
    );
};

export default AddUserForm;
