import { Request, Response } from 'express';
import OrderItem from '../model/orderitemmodel';
import Order from '../model/odermodel';
import Product from '../model/productmodel';

export const getAllOrderItems = async (req: Request, res: Response) => {
  try {
    const orderItems = await OrderItem.findAll({
      include: [{ model: Product }],
    });
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getOrderItemById = async (req: Request, res: Response) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!orderItem) {
      return res.status(404).json({ error: 'OrderItem not found' });
    }
    res.json(orderItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createOrderItem = async (req: Request, res: Response) => {
  try {
    const { OrderID, ProductID, Quantity, Price } = req.body;
    const amount = Price * Quantity; // Calculate amount
    const orderItem = await OrderItem.create({
      OrderID,
      ProductID,
      Quantity,
      Price,
      Amount: amount,
    });
    res.status(201).json(orderItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateOrderItem = async (req: Request, res: Response) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ error: 'OrderItem not found' });
    }
    const {  Quantity, Price } = req.body;
    if (Quantity !== undefined) {
      orderItem.Quantity = Quantity;
    }
    if (Price !== undefined) {
      orderItem.Price = Price;
    }
    
    orderItem.Amount = Price * Quantity; // Recalculate amount
    await orderItem.save();
    res.json(orderItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const deleteOrderItem = async (req: Request, res: Response) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ error: 'OrderItem not found' });
    }
    await orderItem.destroy();
    res.json({ message: 'OrderItem deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { getAllOrderItems, getOrderItemById, createOrderItem, updateOrderItem, deleteOrderItem };
