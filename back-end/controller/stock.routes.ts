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

/**
 * @swagger
 * /stock/{organisationName}:
 *   post:
 *     summary: Add a new stock item by organisation name
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: organisationName
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the organisation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Airpods"
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: The newly added stock item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StockItem'
 *       500:
 *         description: Some server error
 */

// TODO: make stockitems name unique
//* add a new stock item by organisation name
router.post('/:organisationName', async (req: Request, res: Response) => {
    try {
        const organisationName = req.params.organisationName;
        const { name, quantity } = req.body;
        const newItem = await stockService.addStockItemByOrganisationName(
            name,
            quantity,
            organisationName
        );
        res.status(201).json(newItem);
    } catch (error) {
        const err = error as Error;
        res.status(500);
    }
});

/**
 * @swagger
 * /stock/{id}:
 *   put:
 *     summary: Update quantity of a stock item by id
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the stockitem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: The updated stock item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StockItem'
 *       500:
 *         description: Some server error
 */

//* update stock item quantity by id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { quantity } = req.body;
        const updatedItem = await stockService.updateStockItemQuantityById(id, quantity);
        res.status(200).json(updatedItem);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

//TODO error handling

export default router;
