import express, { Router, Request, Response } from 'express';
import Usercontroller from '../controller/usercontroller';

const router: Router = express.Router();

// Define routes
router.post('/login', Usercontroller.login);
router.post('/signup', Usercontroller.signup);

export default router;
