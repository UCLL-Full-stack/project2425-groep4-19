import { Request, Response } from 'express';
import { getStockItemsHandler, updateStockItemHandler } from '../controller/stock.routes';
import * as stockService from '../service/stock.service';

jest.mock('../service/stock.service');

describe('Stock API', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ send: jest.fn() });
        res = {
            json: jsonMock,
            status: statusMock,
        };
    });

    it('should fetch all stock items', () => {
        const mockItems = [
            { id: '1', name: 'Item 1', quantity: 10 },
            { id: '2', name: 'Item 2', quantity: 20 },
        ];
        (stockService.getStockItems as jest.Mock).mockReturnValue(mockItems);

        req = {};
        getStockItemsHandler(req as Request, res as Response);
        expect(jsonMock).toHaveBeenCalledWith(mockItems);
    });

    it('should update stock quantity', () => {
        const mockItem = { id: '1', name: 'Item 1', quantity: 15 };
        (stockService.updateStockItem as jest.Mock).mockReturnValue(mockItem);

        req = {
            params: { id: '1' },
            body: { quantity: 15 },
        };
        updateStockItemHandler(req as Request, res as Response);
        expect(jsonMock).toHaveBeenCalledWith(mockItem);
    });

    it('should return 404 for non-existing item', () => {
        (stockService.updateStockItem as jest.Mock).mockImplementation(() => {
            throw new Error('Item not found');
        });

        req = {
            params: { id: '999' },
            body: { quantity: 15 },
        };
        updateStockItemHandler(req as Request, res as Response);
        expect(statusMock).toHaveBeenCalledWith(404);
    });
});