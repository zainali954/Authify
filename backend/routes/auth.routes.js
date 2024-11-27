import express from 'express';
const router = express.Router();

import { register, login, logout, verifyEmail, forgotPassword, resetPassword, refreshToken, resendVerificationEmail } from '../controllers/auth.controller.js';
import verifyAuth from '../middlewares/verifyAuth.js';

router.post('/register', register)
router.post('/login', login)
router.post('/verify-email', verifyEmail)

router.post('/resend-verification-email', verifyAuth, resendVerificationEmail)

router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

router.post('/logout', verifyAuth, logout )

router.post('/refresh-access-token', refreshToken)

export default router;