import dotenv from 'dotenv';
import { OrganisationInput } from '../types';
import organisationRepository from '../repository/organisation.repository';
import { Organisation } from '../model/organisation';
import userRepository from '../repository/user.repository';

dotenv.config();

const getAllOrganisations = async (): Promise<Organisation[]> => {
    try {
        return await organisationRepository.getAllOrganisations();
    } catch (error) {
        throw new Error("Couldn't get organisations");
    }
};

const createOrganisation = async (
    organisation: OrganisationInput,
    userId: number
): Promise<Organisation> => {
    try {
        const newOrganisation = await organisationRepository.createOrganisation(
            organisation,
            userId
        );
        // Update the user's role to admin
        await userRepository.updateUserRole(userId, 'admin');
        return newOrganisation;
    } catch (error) {
        throw new Error("Couldn't create organisation");
    }
};

export default {
    getAllOrganisations,
    createOrganisation,
};
