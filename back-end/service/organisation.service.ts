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

const addUserToOrganisation = async (
    username: string,
    organisationName: string
): Promise<{ message: string }> => {
    try {
        console.log(`Adding user: ${username} to organisation: ${organisationName}`);
        const user = await userRepository.findByUsername(username);

        if (!user || !user.id) {
            console.error("Couldn't find user");
            throw new Error("Couldn't find user");
        }

        // Check if the user is already part of an organisation
        const existingOrganisation = await organisationRepository.getOrganisationByUser(username);
        if (existingOrganisation) {
            console.error(`User ${username} is already part of an organisation`);
            throw new Error(`User ${username} is already part of an organisation`);
        }

        const organisation = await organisationRepository.getOrganisationByName(organisationName);

        if (!organisation || !organisation.id) {
            console.error("Couldn't find organisation");
            throw new Error("Couldn't find organisation");
        }

        await organisationRepository.addUserToOrganisation(user.id, organisation.id);
        console.log(`User: ${username} added to organisation: ${organisationName}`);
        return { message: 'User added to organisation' };
    } catch (error) {
        console.error("Couldn't add user to organisation:", error);
        throw new Error("Couldn't add user to organisation");
    }
};

const removeUserFromOrganisation = async (
    userId: number,
    organisationName: string
): Promise<{ message: string }> => {
    try {
        console.log(`Removing user with id: ${userId} from organisation: ${organisationName}`);
        const organisation = await organisationRepository.getOrganisationByName(organisationName);

        if (!organisation || !organisation.id) {
            console.error("Couldn't find organisation");
            throw new Error("Couldn't find organisation");
        }

        await organisationRepository.removeUserFromOrganisation(userId, organisation.id);
        console.log(`User with id: ${userId} removed from organisation: ${organisationName}`);
        return { message: 'User removed from organisation' };
    } catch (error) {
        console.error("Couldn't add user to organisation:", error);
        throw new Error("Couldn't add user to organisation");
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
