import express, { Router } from 'express';
import userRoutes from './userroutes';

const router: Router = express.Router();

// Include user routes
router.use('/users', userRoutes);

export default router;
