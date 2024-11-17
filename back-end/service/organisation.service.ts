import dotenv from 'dotenv';
import { OrganisationInput } from '../types';
import organisationRepository from '../repository/organisation.repository';
import { Organisation } from '../model/organisation';

dotenv.config();

const getAllOrganisations = async (): Promise<Organisation[]> => {
    try {
        return await organisationRepository.getAllOrganisations();
    } catch (error) {
        throw new Error("Couldn't get organisations");
    }
};

const createOrganisation = async (organisation: OrganisationInput): Promise<Organisation> => {
    try {
        return await organisationRepository.createOrganisation(organisation);
    } catch (error) {
        throw new Error("Couldn't create organisation");
    }
};

export default {
    getAllOrganisations,
    createOrganisation,
};
