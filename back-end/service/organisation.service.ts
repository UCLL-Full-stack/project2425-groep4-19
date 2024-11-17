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
    username: string
): Promise<Organisation> => {
    try {
        // Get userId by username
        const user = await userRepository.findByUsername(username);

        // Check if user exists
        if (!user || !user.id) {
            throw new Error("Couldn't find user");
        }
        // create organisation
        const newOrganisation = await organisationRepository.createOrganisation(
            organisation,
            user.id
        );

        // update user role
        await userRepository.updateUserRole(user.id, 'admin');

        // return new organisation
        return newOrganisation;
    } catch (error) {
        throw new Error("Couldn't create organisation");
    }
};

export default {
    getAllOrganisations,
    createOrganisation,
};
