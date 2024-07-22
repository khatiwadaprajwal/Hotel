import { Request, Response } from 'express';
import OrderItem from '../model/orderitemmodel';

export const getAllOrderItems = async (req: Request, res: Response) => {
  try {
    const orderItems = await OrderItem.findAll();
    res.status(200).json(orderItems);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderItemById = async (req: Request, res: Response) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (orderItem) {
      res.status(200).json(orderItem);
    } else {
      res.status(404).json({ message: 'Order Item not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrderItem = async (req: Request, res: Response) => {
  try {
    const newOrderItem = await OrderItem.create(req.body);
    res.status(201).json(newOrderItem);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderItem = async (req: Request, res: Response) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (orderItem) {
      await orderItem.update(req.body);
      res.status(200).json(orderItem);
    } else {
      res.status(404).json({ message: 'Order Item not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrderItem = async (req: Request, res: Response) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (orderItem) {
      await orderItem.destroy();
      res.status(200).json({ message: 'Order Item deleted' });
    } else {
      res.status(404).json({ message: 'Order Item not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
export default { getAllOrderItems, getOrderItemById, createOrderItem, updateOrderItem, deleteOrderItem };