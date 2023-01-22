import express from 'express';
import cors from 'cors';
import { login, signUp } from '../controllers/AuthController.js';

const router = express.Router();

router.use(cors());

router.post('/login', login);
router.post('/sign-up', signUp);

export default router;