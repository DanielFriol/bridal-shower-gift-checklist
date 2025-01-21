import express from 'express';
import { parseHttpRequest, parseHttpResponse } from '../src/shared/express-event-parser';
import { makeGetChecklistController } from '../src/get-checklist/get-checklist.factory';
import { makeAddGiftController } from '../src/add-gift/add-gift.factory';
import { makePatchChecklistController } from '../src/patch-checklist/patch-checklist.factory';

const router = express.Router();

// Get all checklists
router.get('/', async (req, res) => {
    const controller = makeGetChecklistController();
    const response = await controller.handle();
    return parseHttpResponse(res, response);
});

router.post('/gifts', async (req, res) => {
    const httpRequest = parseHttpRequest(req);
    const controller = makeAddGiftController();
    const response = await controller.handle(httpRequest);
    return parseHttpResponse(res, response);
});

// Update a checklist
router.patch('/gifts/:giftId', async (req, res) => {
    const httpRequest = parseHttpRequest(req);
    const controller = makePatchChecklistController();
    const response = await controller.handle(httpRequest);
    return parseHttpResponse(res, response);
});

export default router;
