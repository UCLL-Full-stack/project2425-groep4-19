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

export default {
    getAllOrganisations,
    createOrganisation,
    getOrganisationByName,
    getOrganisationById,
};
