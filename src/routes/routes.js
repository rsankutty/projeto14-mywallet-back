import express from 'express';
import cors from 'cors';
import { login, signUp } from '../controllers/AuthController.js';
import { getCashFlow, addFlow } from '../controllers/CashFlowController.js';

const router = express.Router();

router.use(cors());

router.post('/login', login);
router.post('/sign-up', signUp);
router.get('/cashflow', getCashFlow);
router.post('/cashflow', addFlow);

export default router;