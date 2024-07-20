import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/usermodel'; // Adjust the import path as necessary
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  userId: number;
}

declare module 'express-serve-static-core' {
  interface Request {
    auth_user?: any; // Adjust type as necessary
  }
}

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is prefixed with 'Bearer '

    if (!token) {
      return res.status(401).json({ msg: 'Unauthorized access - Token missing' });
    }

    let data: JwtPayload;
    try {
      data = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret') as JwtPayload;
    } catch {
      return res.status(401).json({ msg: 'Unauthorized access - Invalid token' });
    }

    const user = await User.findOne({ where: { UserID: data.userId} });

    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized access - User not found' });
    }

    req.auth_user = user; // Attach the user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error:any) {
    console.error('Error in isLoggedIn middleware:', error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export default isLoggedIn;
