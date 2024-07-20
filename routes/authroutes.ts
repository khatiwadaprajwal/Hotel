import express, { Router, Request, Response } from 'express';
import authcontroller from '../controller/auth';

const router: Router = express.Router();

// Define routes
router.post('/login', authcontroller.login);
router.post('/signup', authcontroller.signup);
router.post('/verify-otp', authcontroller.verifyOTP);


export default router;
