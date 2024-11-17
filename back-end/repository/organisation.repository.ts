import { Organisation } from '../model/organisation';
import database from '../util/database';

const getAllOrganisations = async (): Promise<Organisation[]> => {
    try {
        const organisations = await database.organisation.findMany();
        return organisations.map((organisation) => Organisation.from(organisation));
    } catch (error) {
        throw new Error(`Error getting organisations: ${error})`);
    }
};

export default { getAllOrganisations };
