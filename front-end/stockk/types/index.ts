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
    stockItems?: StockItem[];
};

export type StockItem = {
    id?: number;
    name?: string;
    sku?: string;
    category?: string;
    quantity?: number;
    updatedAt?: string;
    organisation?: Organisation;
    tags?: StockItemTag[];
};

export type StockItemTag = {
    id?: number;
    name?: string;
    color?: string;
};
