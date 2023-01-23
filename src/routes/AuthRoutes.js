import { Router } from 'express'
import { login, signUp } from '../controllers/AuthController.js';
import { validateSchema } from "../middleware/validadeSchema.js"
import { loginSchema, signUpSchema } from '../schemas/AuthSchemas.js'


const authRouter = Router();

authRouter.post('/login', validateSchema(loginSchema),login);
authRouter.post('/sign-up',validateSchema(signUpSchema),signUp);


export default authRouter;