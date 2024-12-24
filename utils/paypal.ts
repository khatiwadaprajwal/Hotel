import axios from 'axios';

export const generateAccessToken = async (): Promise<string> => {
  try {
    if (!process.env.PAYPAL_BASE_URL || !process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_SECRET) {
      throw new Error('Missing PayPal environment variables');
    }

    const baseUrl = process.env.PAYPAL_BASE_URL?.endsWith('/')
      ? process.env.PAYPAL_BASE_URL
      : `${process.env.PAYPAL_BASE_URL}/`;
    const url = `${baseUrl}v1/oauth2/token`;

    // Add detailed logging for debugging
    console.log('Request URL:', url);
    console.log('Client ID:', process.env.PAYPAL_CLIENT_ID);
    console.log('PayPal Secret:', process.env.PAYPAL_SECRET);

    const response = await axios({
      method: 'post',
      url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
      data: 'grant_type=client_credentials',
    });

    console.log('Response:', response.data);
    return response.data.access_token;
  } catch (error: any) {
    if (error.response) {
      console.error('Error Response:', error.response.data);  // Logs full error response from PayPal
      console.error('Status Code:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else {
      console.error('Error Message:', error.message);
    }
    throw error;
  }
};

export default generateAccessToken;