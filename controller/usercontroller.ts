import { Request, Response } from 'express';
import User, { UserInstance } from '../model/usermodel'; // Adjust import for User model and UserInstance
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendOTPByEmail } from '../utils/mailer';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

// Function to generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
}




export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP(); // Generate OTP

    // Save OTP and user details to the database
    const user = await User.create({
      UserID:0, 
      Name: name,
      Email: email,
      Password: hashedPassword,
      Phone: phone,
      Address: address,
      Role: role,
      OTP: otp,
      OTPExpiration: new Date(Date.now() + 10 * 60 * 1000) // OTP expires in 10 minutes
    });

    // Send OTP via email
    await sendOTPByEmail(email, otp);

    res.status(201).json({ message: 'OTP sent to email for verification' });
  } catch (error: any) {
    console.error('Error in signup:', error.message);
    res.status(500).json({ error: error.message });
  }
};


export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { Email: email } }) as UserInstance;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP matches and has not expired
    if (user.OTP === otp && user.OTPExpiration && user.OTPExpiration > new Date()) {
      // Update user status or mark as verified
      await user.update({ Verified: true });

      // Generate JWT token for authentication
      const token = jwt.sign({ userId: user.UserID }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({
        message: 'OTP verified. User registered and logged in successfully',
        token
      });
    } else {
      res.status(400).json({ message: 'Invalid OTP or OTP expired. Please try again.' });
    }
  } catch (error: any) {
    console.error('Error in verifyOTP:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { Email: email } }) as UserInstance;
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate JWT token for authentication
    const token = jwt.sign({ userId: user.UserID }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'User logged in successfully',
      token
    });
  } catch (error: any) {
    console.error('Error in login:', error.message);
    res.status(500).json({ error: error.message });
  }
};
export default { signup, verifyOTP, login };
