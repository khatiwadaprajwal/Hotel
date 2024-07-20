import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Check if the user is logged in
  if (!req.auth_user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Log the user role for debugging
  console.log('User Role:', req.auth_user.Role);

  // Check if the user role is 'Admin'
  if (req.auth_user.Role === 'Admin') {
    next(); // User is an admin, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ message: 'Access denied' }); // User is not an admin
  }
};

export default isAdmin;
