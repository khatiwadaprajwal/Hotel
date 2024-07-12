import { Request, Response } from 'express';
import User from '../model/usermodel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ Name: name, Email: email, Password: hashedPassword, Phone: phone, Address: address, Role: role });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }

};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user.UserID }, JWT_SECRET, { expiresIn: '1h' });
    //res.status(200).json({ message:'User logged in sucessfully' });
    res.status(200).json({
      message: 'User logged in successfully',
       token });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
export default { signup, login };

