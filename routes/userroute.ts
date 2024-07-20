import express, { Router, Request, Response } from 'express';
import Usercontroller from '../controller/usercontroller';


const router: Router = express.Router();

// Define routes
router.get('/getAllCustomers', Usercontroller.getAllCustomers);
router.get('/getOneUserByEmail/:email', Usercontroller.getOneUserByEmail);
router.delete('/deleteUserByEmail/:email', Usercontroller.deleteUserByEmail);
router.put('/updateUserByEmail/:email', Usercontroller.updateUserByEmail);



export default router;