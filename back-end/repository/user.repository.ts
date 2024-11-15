import { User } from '../model/user';

const users: User[] = [];

const admin = new User({
    email: 'admin@admin.com',
    password: 'admin',
    role: 'admin',
    username: 'admin',
});

users.push(admin);

const findByEmail = (email: string): User | undefined => {
    return users.find((user) => user.email === email);
};

const getAllUsers = (): User[] => {
    return users;
};

const createUser = (user: User): User => {
    users.push(user);
    return user;
};

export default {
    findByEmail,
    getAllUsers,
    createUser,
};
