import { Router } from 'express';
import { login, logout, refreshToken } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

export default router;
