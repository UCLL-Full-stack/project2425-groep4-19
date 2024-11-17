import express, { Request, Response } from 'express';
import organisationService from '../service/organisation.service';
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Organisation:
 *      type: object
 *      properties:
 *       id:
 *        type: integer
 *        example: 1
 *       name:
 *        type: string
 *        example: "Organisation Name"
 *       users:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/User'
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

//Todo error handling

export default router;
