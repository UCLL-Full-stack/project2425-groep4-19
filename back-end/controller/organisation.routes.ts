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
 * tags:
 *   name: Organisation
 *   description: Organisation functions
 * /organisations:
 *   post:
 *     summary: Create a new organisation
 *     tags: [Organisation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrganisationInput'
 *     responses:
 *       200:
 *         description: A Organisation object is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organisation'
 *       500:
 *         description: Some server error
 */

//* create organisation
router.post('/:userId', async (req: Request, res: Response) => {
    try {
        const organisation = req.body;
        const userId = parseInt(req.params.userId);
        const newOrganisation = await organisationService.createOrganisation(organisation, userId);
        res.status(201).json(newOrganisation);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

//Todo error handling

export default router;
