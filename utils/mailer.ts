import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'chester.bernhard73@ethereal.email',
        pass: 'RmF4tGY9HGD7XTBuPE'
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