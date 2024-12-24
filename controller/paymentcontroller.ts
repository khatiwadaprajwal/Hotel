
import Payment from '../model/paymentmodel';
import OrderItem from '../model/orderitemmodel';
import paypal from '@paypal/checkout-server-sdk';
import { Request, Response } from 'express';
import{ generateAccessToken } from '../utils/paypal';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();




export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const createPayment = async (req: Request, res: Response) => {
  try {
    const newPayment = await Payment.create(req.body);
    res.status(201).json(newPayment);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePayment = async (req: Request, res: Response) => {
  try {
    
    const payment = await Payment.findByPk(req.params.id);
    if (payment) {
      await payment.update(req.body);
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (payment) {
      await payment.destroy();
      res.status(200).json({ message: 'Payment deleted' });
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const createPayPalPayment = async (req: Request, res: Response) => {
  try {
    const { OrderID, PaymentMethod, PaymentDate, Amount, TransactionID } = req.body;

    // Ensure Amount is a number and properly formatted
    const formattedAmount = parseFloat(Amount.toString());
    if (isNaN(formattedAmount)) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Get PayPal access token
    const accessToken = await generateAccessToken();

    // Define PayPal API URL
    const baseUrl = process.env.PAYPAL_BASE_URL?.endsWith('/')
      ? process.env.PAYPAL_BASE_URL
      : `${process.env.PAYPAL_BASE_URL}/`;
    const url = `${baseUrl}v2/checkout/orders`;

    // Make the PayPal API call to create the order
    const response = await axios({
      method: 'post',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: formattedAmount.toFixed(2), // Ensure to pass value as string
            },
          },
        ],
      },
    });

    // Check for the successful response
    if (response.data.status !== 'CREATED') {
      return res.status(500).json({ error: 'Failed to create PayPal order' });
    }

    // Create payment entry in your database only if PayPal order creation was successful
    const newPayment = await Payment.create({
      OrderID,
      PaymentMethod,
      PaymentDate,
      Amount: formattedAmount,
      TransactionID,
    });

    // Respond with the PayPal order data and payment details
    res.status(201).json({
      message: 'Payment created successfully',
      paypalOrder: response.data,
      paymentDetails: newPayment,
    });
  } catch (error: any) {
    console.error('Error creating PayPal payment:', error.message);
    res.status(500).json({ error: error.message });
  }
};



export default { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment,createPayPalPayment};