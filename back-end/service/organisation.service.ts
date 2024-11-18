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

const getOrganisationByName = async (name: string): Promise<Organisation> => {
    try {
        return await organisationRepository.getOrganisationByName(name);
    } catch (error) {
        throw new Error("Couldn't get organisation");
    }
};

const getOrganisationById = async (id: string): Promise<Organisation> => {
    try {
        console.log(`Fetching organisation with id: ${id}`);
        return await organisationRepository.getOrganisationById(id);
    } catch (error) {
        const err = error as Error;
        console.error(`Error in service layer: ${err.message}`);
        throw new Error("Couldn't get organisation");
    }
};

const getOrganisationByUser = async (username: string): Promise<Organisation | null> => {
    try {
        console.log(`Fetching organisation for user: ${username}`);
        const organisation = await organisationRepository.getOrganisationByUser(username);
        return organisation;
    } catch (error) {
        const err = error as Error;
        console.error(`Error in service layer: ${err.message}`);
        throw new Error("Couldn't get organisation for user");
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
    getOrganisationByName,
    getOrganisationById,
    getOrganisationByUser,
};
