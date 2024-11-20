import { Organisation } from '../model/organisation';
import { OrganisationInput } from '../types';
import database from '../util/database';

const getAllOrganisations = async (): Promise<Organisation[]> => {
    try {
        const organisations = await database.organisation.findMany({ include: { users: true } });
        return organisations.map((organisation) => Organisation.from(organisation));
    } catch (error) {
        throw new Error(`Error getting organisations: ${error})`);
    }
};

const getOrganisationByName = async (name: string): Promise<Organisation> => {
    try {
        const organisation = await database.organisation.findFirst({
            where: {
                name,
            },
            include: {
                users: true,
            },
        });
        if (!organisation) {
            throw new Error('Organisation not found');
        }
        return Organisation.from(organisation);
    } catch (error) {
        throw new Error(`Error getting organisation: ${error})`);
    }
};

const getOrganisationById = async (id: string): Promise<Organisation> => {
    try {
        console.log(`Querying database for organisation with id: ${id}`);
        const organisation = await database.organisation.findUnique({
            where: { id: parseInt(id) },
        });
        if (!organisation) {
            console.error('Organisation not found');
            throw new Error('Organisation not found');
        }
        return Organisation.from(organisation);
    } catch (error) {
        const err = error as Error;
        console.error(`Error in repository layer: ${err.message}`);
        throw new Error(`Error getting organisation: ${error})`);
    }
};

const getOrganisationByUser = async (username: string): Promise<Organisation | null> => {
    try {
        console.log(`Querying database for organisation with user: ${username}`);
        const organisation = await database.organisation.findFirst({
            where: {
                users: {
                    some: {
                        username,
                    },
                },
            },
        });
        if (!organisation) {
            console.log('Organisation not found for user:', username);
            return null;
        }
        return Organisation.from(organisation);
    } catch (error) {
        const err = error as Error;
        console.error(`Error in repository layer: ${err.message}`);
        throw new Error(`Error getting organisation: ${error})`);
    }
};

const createOrganisation = async (
    organisation: OrganisationInput,
    userId: number
): Promise<Organisation> => {
    try {
        const newOrganisation = await database.organisation.create({
            data: {
                name: organisation.name,
                users: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return Organisation.from(newOrganisation);
    } catch (error) {
        throw new Error(`Error creating organisation: ${error})`);
    }
};

const addUserToOrganisation = async (
    userId: number,
    organisationId: number
): Promise<Organisation> => {
    try {
        console.log(`Adding user with id: ${userId} to organisation with id: ${organisationId}`);
        const organisation = await database.organisation.update({
            where: { id: organisationId },
            data: {
                users: {
                    connect: { id: userId },
                },
            },
        });
        return Organisation.from(organisation);
    } catch (error) {
        console.error(`Error adding user to organisation: ${error}`);
        throw new Error(`Error adding user to organisation: ${error}`);
    }
};

const removeUserFromOrganisation = async (
    userId: number,
    organisationId: number
): Promise<void> => {
    try {
        console.log(
            `Removing user with id: ${userId} from organisation with id: ${organisationId}`
        );
        await database.organisation.update({
            where: { id: organisationId },
            data: {
                users: {
                    disconnect: { id: userId },
                },
            },
        });
        return;
    } catch (error) {
        console.error(`Error removing user from organisation: ${error}`);
        throw new Error(`Error removing user from organisation: ${error}`);
    }
};

export default {
    getAllOrganisations,
    createOrganisation,
    getOrganisationByName,
    getOrganisationById,
    getOrganisationByUser,
    addUserToOrganisation,
    removeUserFromOrganisation,
};
