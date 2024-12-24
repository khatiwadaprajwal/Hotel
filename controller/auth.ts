import { Request, Response } from 'express';
import TempUser, { TempUserInstance } from '../model/tempusermodel';
import User, { UserInstance } from '../model/usermodel';
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

// Signup and send OTP
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP(); // Generate OTP

    // Saving OTP and temporary user details to the temporary user table
    await TempUser.create({
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

// Verify OTP and register user
export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    // Find temporary user by email
    const tempUser = await TempUser.findOne({ where: { Email: email } }) as TempUserInstance;
    if (!tempUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP matches and has not expired
    if (tempUser.OTP === otp && tempUser.OTPExpiration && tempUser.OTPExpiration > new Date()) {
      // Transfer data from temporary user to actual user table
      const user = await User.create({
        Name: tempUser.Name,
        Email: tempUser.Email,
        Password: tempUser.Password,
        Phone: tempUser.Phone,
        Address: tempUser.Address,
        Role: tempUser.Role,
        Verified: true
      });

      // Delete the temporary user record
      await TempUser.destroy({ where: { TempUserID: tempUser.TempUserID } });

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

// Login user
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
