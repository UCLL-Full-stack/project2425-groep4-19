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

export default { getAllOrganisations, createOrganisation };
