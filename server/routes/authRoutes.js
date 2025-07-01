import express from 'express';
import { login, logout, register,checkAuth } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const authRouter = express.Router();

authRouter.post('/signup', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
// authRouter.post('/me',checkAuth)

export default authRouter;
