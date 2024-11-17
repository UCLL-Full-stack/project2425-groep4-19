// DTO's for the application

type UserInput = {
    email: string;
    username: string;
    password: string;
    role: string;
};

type OrganisationInput = {
    name: string;
};

export { UserInput, OrganisationInput };
