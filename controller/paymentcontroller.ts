
import Payment from '../model/paymentmodel';
import OrderItem from '../model/orderitemmodel';
import paypal from '@paypal/checkout-server-sdk';
import { Request, Response } from 'express';
import{ generateAccessToken } from '../utils/paypal';
import axios from 'axios';
import dotenv from 'dotenv';
import Product from '../model/productmodel';
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
    const { OrderID, OrderItems } = req.body;

    // Validate each OrderItem's price
    for (const item of OrderItems) {
      const product:any = await Product.findByPk(item.ProductID);
      
      // If the product is not found, return an error
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Check if the price entered for the item matches the actual product price
      if (parseFloat(item.Price) !== parseFloat(product.Price)) {
        return res.status(400).json({
          error: `Incorrect price for ${product.Name}. The correct price is ${product.Price}. Please enter the correct price.`
        });
      }

      // If the price matches, calculate the amount for the order item
      item.Amount = parseFloat(item.Price) * item.Quantity;
    }

    // After validation, proceed with PayPal payment creation
    const accessToken = await generateAccessToken(); // Ensure this function is implemented correctly
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
              value: OrderItems.reduce((total: any, item: { Amount: any; }) => total + item.Amount, 0).toFixed(2),
            },
          },
        ],
      },
    });

    // Check if the PayPal order was created successfully
    if (response.data.status !== 'CREATED') {
      return res.status(500).json({ error: 'Failed to create PayPal order' });
    }

    // Create payment entry in your database if PayPal order creation was successful
    const newPayment = await Payment.create({
      OrderID,
      PaymentMethod: 'PayPal',
      PaymentDate: new Date(),
      Amount: OrderItems.reduce((total: any, item: { Amount: any; }) => total + item.Amount, 0),
      TransactionID: response.data.id, // Assuming PayPal transaction ID is returned
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