import express, { Request, Response } from 'express';
import stockService from '../service/stock.service';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     StockItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Airpods"
 *         quantity:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * /stock/{organisationName}:
 *   get:
 *     summary: Get the stock items by organisation name
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: organisationName
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the organisation
 *     responses:
 *       200:
 *         description: A list of stock items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StockItem'
 *       500:
 *         description: Some server error
 */

//* get all stock items by organisation name
router.get('/:organisationName', async (req: Request, res: Response) => {
    try {
        const organisationName = req.params.organisationName;
        const items = await stockService.getStockItemsByOrganisationName(organisationName);
        res.status(200).json(items);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

//TODO error handling

export default router;
