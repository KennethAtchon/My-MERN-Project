import express from 'express';

import { sendRequest, AcceptRequest, DeclineRequest, GetRequest } from '../controllers/requests.js';

const router = express.Router();

router.post('/sendreq', sendRequest);
router.post('/acceptreq', AcceptRequest);
router.delete('/declinereq', DeclineRequest)
router.get('/requests', GetRequest);

export default router;