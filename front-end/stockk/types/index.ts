export type User = {
    id?: number;
    email?: string;
    username?: string;
    password?: string;
    role?: string;
};

export type Organisation = {
    id?: number;
    name?: string;
    users?: User[];
};
