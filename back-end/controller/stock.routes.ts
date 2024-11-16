import express, { Request, Response } from 'express';
import * as stockService from '../service/stock.service';

const router = express.Router();

/**
 * @swagger
 * /stock:
 *   get:
 *     summary: Get all stock items
 *     responses:
 *       200:
 *         description: A list of stock items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   quantity:
 *                     type: integer
 */
export const getStockItemsHandler = async (req: Request, res: Response) => {
    const items = await stockService.getStockItems();
    res.json(items);
};

/**
 * @swagger
 * /stock/{id}:
 *   put:
 *     summary: Update stock quantity
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated stock item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *       404:
 *         description: Item not found
 */
export const updateStockItemHandler = (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const updatedItem = stockService.updateStockItem(parseInt(id), quantity);
        res.json(updatedItem);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).send(error.message);
        } else {
            res.status(404).send('Unknown error');
        }
    }
};

router.get('/', getStockItemsHandler);
router.put('/:id', updateStockItemHandler);

export default router;
