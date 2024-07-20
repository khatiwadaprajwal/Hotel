import express, { Router } from 'express';
import authRoutes from './authroutes';
import  userRoutes from './userroute';

//import verifyRoutes from './verifyRoutes'

const router: Router = express.Router();


router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
