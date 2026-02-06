// src/modules/auth/auth.route.ts

import { Router } from 'express';
import { validate } from '../../middleware/validate.middleware';
import { activateUserSchema, loginUserSchema, refreshTokenSchema, registerUserSchema, resendActivationSchema, socialLoginSchema } from './auth.validation';
import { activate, login, logout, refresh, register, resendActivation, social } from './auth.controller';
import { isAuthenticated, optionalAuth } from '../../middleware/auth.middleware';
import { csrfProtection } from '../../middleware/csrf.middleware';
import { authLimiter } from '../../helper/rateLimiter';


const router = Router();

router.post("/register", validate(registerUserSchema), optionalAuth, register);
router.post("/activate", validate(activateUserSchema), activate);
router.post("/resend-activation", validate(resendActivationSchema), resendActivation);
router.post("/login", authLimiter, validate(loginUserSchema), login);
router.post("/refresh-token", csrfProtection, validate(refreshTokenSchema), refresh);
router.post("/social-login", validate(socialLoginSchema), social);
router.post("/logout", csrfProtection, isAuthenticated, logout);


export const authRoutes = router;