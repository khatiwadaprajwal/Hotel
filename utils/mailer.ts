import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const mail_user=process.env.mail_user as string;
const mail_password=process.env.mail_password as string;

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: mail_user,
        pass: mail_password
    }
});
export const sendOTPByEmail = async (to: string, otp: string) => {
    try {
      await transporter.sendMail({
        from: 'chester.bernhard73@ethereal.email',
        to,
        subject: 'Verification OTP',
        text: `Your OTP for registration is ${otp}.`
      });
      console.log(`OTP sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send OTP. Please try again later.');
    }
  };