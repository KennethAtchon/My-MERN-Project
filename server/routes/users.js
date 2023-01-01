import express from 'express';

import { signInUser, signUpUser } from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signInUser);
router.post('/signup', signUpUser);
router.get('/signup', async (req, res) => {
    res.json({ success: true, message: 'Yo' });
})

export default router;