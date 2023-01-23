import { Router } from 'express'
import { getCashFlow, addFlow } from '../controllers/CashFlowController.js';
import { authValidation } from '../middleware/AuthMiddleware.js';
import { validateSchema } from "../middleware/validadeSchema.js"
import { flowSchema } from '../schemas/FlowSchemas.js';

const cashFlowRouter = Router();

cashFlowRouter.use(authValidation)
cashFlowRouter.get('/cashflow', getCashFlow);
cashFlowRouter.post('/cashflow',validateSchema(flowSchema), addFlow);

export default cashFlowRouter;