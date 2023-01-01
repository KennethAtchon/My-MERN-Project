import express from 'express';

import { getMessages, getFriend, deleteFriend, addMessages} from '../controllers/chat.js';

const router = express.Router();

router.get('/chat', getMessages);
router.get('/friend', getFriend);
router.delete('/deletefriend', deleteFriend);
router.post('/chat', addMessages);

export default router;