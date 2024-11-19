import express, { Request, Response } from 'express';
import organisationService from '../service/organisation.service';
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Organisation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Organisation Name"
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *     OrganisationInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Organisation Name"
 */

/**
 * @swagger
 * /organisations:
 *   get:
 *     summary: Get all organisations
 *     tags: [Organisation]
 *     responses:
 *       200:
 *         description: A list of organisations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organisation'
 *       500:
 *         description: Some server error
 */

//* Get all organisations
router.get('/', async (req: Request, res: Response) => {
    try {
        const organisations = await organisationService.getAllOrganisations();
        res.status(200).json(organisations);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /organisations/{name}:
 *   get:
 *     summary: Get organisation by name
 *     tags: [Organisation]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the organisation
 *     responses:
 *       200:
 *         description: An organisation object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organisation'
 *       500:
 *         description: Some server error
 */

//* Get organisation by name
router.get('/:name', async (req: Request, res: Response) => {
    try {
        const name = req.params.name;
        const organisation = await organisationService.getOrganisationByName(name);
        res.status(200).json(organisation);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /organisations/id/{id}:
 *   get:
 *     summary: Get organisation by id
 *     tags: [Organisation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the organisation
 *     responses:
 *       200:
 *         description: An organisation object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organisation'
 *       500:
 *         description: Some server error
 */

//* Get organisation by id
router.get('/id/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (id === 'undefined') {
            return res.status(200).json(undefined);
        }
        const organisation = await organisationService.getOrganisationById(id);
        res.status(200).json(organisation);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

//* Get organisation by user
router.get('/user/:username', async (req: Request, res: Response) => {
    try {
        const username = req.params.username;
        const organisation = await organisationService.getOrganisationByUser(username);
        if (organisation === null) {
            return res.status(200).json(null);
        }
        res.status(200).json(organisation);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * tags:
 *   name: Organisation
 *   description: Organisation functions
 * /organisations/{username}:
 *   post:
 *     summary: Create a new organisation
 *     tags: [Organisation]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user creating the organisation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrganisationInput'
 *     responses:
 *       201:
 *         description: A Organisation object is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organisation'
 *       500:
 *         description: Some server error
 */

//* create organisation
router.post('/:username', async (req: Request, res: Response) => {
    try {
        const organisation = req.body;
        const username = req.params.username;
        const newOrganisation = await organisationService.createOrganisation(
            organisation,
            username
        );
        res.status(201).json(newOrganisation);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * tags:
 *   name: Organisation
 *   description: Organisation functions
 * /organisations/adduser/{username}/{organisationName}:
 *   put:
 *     summary: Add user to organisation
 *     tags: [Organisation]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user being added to the organisation
 *       - in: path
 *         name: organisationName
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the organisation the user is being added to
 *     responses:
 *       200:
 *         description: A Organisation object is updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organisation'
 *       500:
 *         description: Some server error
 */

//* add user to organisation
router.put('/adduser/:username/:organisationName', async (req: Request, res: Response) => {
    try {
        const username = req.params.username;
        const organisationName = req.params.organisationName;

        console.log(`Adding user ${username} to organisation ${organisationName}`);

        const result = await organisationService.addUserToOrganisation(username, organisationName);

        console.log(`User ${username} successfully added to organisation ${organisationName}`);

        res.status(200).json(result.message);
    } catch (error) {
        const err = error as Error;

        console.error(
            `Error adding user ${req.params.username} to organisation ${req.params.organisationName}: ${err.message}`
        );

        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * tags:
 *   name: Organisation
 *   description: Organisation functions
 * /organisations/removeuser/{userId}/{organisationName}:
 *   put:
 *     summary: Remove user from organisation
 *     tags: [Organisation]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UserId of the user being removed from the organisation
 *       - in: path
 *         name: organisationName
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the organisation the user is being removed from
 *     responses:
 *       200:
 *         description: A Organisation object is updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organisation'
 *       500:
 *         description: Some server error
 */

//* remove user from organisation
router.put('/removeuser/:userId/:organisationName', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const organisationName = req.params.organisationName;

        console.log(`Removing user with id ${userId} from organisation ${organisationName}`);

        const result = await organisationService.removeUserFromOrganisation(
            userId,
            organisationName
        );

        console.log(`User ${userId} successfully removed from organisation ${organisationName}`);

        res.status(200).json(result.message);
    } catch (error) {
        const err = error as Error;

        console.error(
            `Error removing user ${req.params.username} from organisation ${req.params.organisationName}: ${err.message}`
        );

        res.status(500).json({ message: err.message });
    }
});

//Todo error handling

export default router;
