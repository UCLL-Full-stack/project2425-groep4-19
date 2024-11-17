import dotenv from 'dotenv';
import { OrganisationInput } from '../types';

dotenv.config();

const getAllOrganisations = async (): Promise<Organisation[]> => {
    try {
        return await organisationRepository.getAll();
    } catch (error) {}
};

export default {
    getAllOrganisations,
};
