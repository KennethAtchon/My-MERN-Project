import express from 'express';

import {validateJWT} from '../controllers/auth.js';

const router = express.Router();

router.get('/protected-route', validateJWT, (req, res) => {
    res.json({ message: 'Success' });
  });

export default router;