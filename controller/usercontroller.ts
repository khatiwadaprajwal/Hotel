import { Request, Response } from 'express';
import User, { UserInstance } from '../model/usermodel';
import dotenv from 'dotenv';
dotenv.config();

// Get all users with role 'Customer'
export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await User.findAll({ where: { Role: 'Customer' } });
    res.status(200).json(customers);
  } catch (error: any) {
    console.error('Error in getAllCustomers:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get one user by email
export const getOneUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error: any) {
    console.error('Error in getOneUserByEmail:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Delete user by email
export const deleteUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.destroy({ where: { Email: email } });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    console.error('Error in deleteUserByEmail:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.params;
    const updatedUserData = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ where: { Email: email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user details
      if (updatedUserData.Name) user.Name = updatedUserData.Name;
      if (updatedUserData.Phone) user.Phone = updatedUserData.Phone;
      if (updatedUserData.Address) user.Address = updatedUserData.Address;
      if (updatedUserData.Role) user.Role = updatedUserData.Role;
  
      // Save the updated user
      await user.save();
  
      // Return the updated user
      res.status(200).json({ message: 'User updated successfully.', user });
    } catch (error: any) {
      console.error('Error updating user by email:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
 
  
// Export all functions
export default { getAllCustomers, getOneUserByEmail, deleteUserByEmail, updateUserByEmail };
