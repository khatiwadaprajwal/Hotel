import express, { Router } from 'express';
import userRoutes from './userroutes';
//import verifyRoutes from './verifyRoutes'

const router: Router = express.Router();

// Include user routes
router.use('/users', userRoutes);
//router.use('/verify',verifyRoutes)

export default router;
