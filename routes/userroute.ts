import express, { Router, Request, Response } from 'express';
import Usercontroller from '../controller/usercontroller';
//import role =require( '../middleware/role')
import isLoggedIn from '../middleware/isloggedin.middleware';
import isAdmin from '../middleware/rbac.middleware';

const router: Router = express.Router();

// Define routes
router.get('/getAllCustomers',isLoggedIn,Usercontroller.getAllCustomers);

router.get('/getOneUserByEmail/:email', Usercontroller.getOneUserByEmail);
router.delete('/deleteUserByEmail/:email', Usercontroller.deleteUserByEmail);
router.put('/updateUserByEmail/:email',isLoggedIn,isAdmin ,Usercontroller.updateUserByEmail);



export default router;