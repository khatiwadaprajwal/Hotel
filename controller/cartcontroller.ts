import { Request, Response } from 'express';
import Cart from '../model/cartmodel';
import CartItem from '../model/cartitemmodel';
import User from '../model/usermodel';

export const getAllCarts = async (req: Request, res: Response) => {
  try {
    const carts = await Cart.findAll({
      include: [{ model: CartItem }],
    });
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCartById = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findByPk(req.params.id, {
      include: [{ model: CartItem }],
    });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const cart = await Cart.create({ UserID: userId });
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const { userId } = req.body;
    cart.UserID = userId;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    await cart.destroy();
    res.json({ message: 'Cart deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { getAllCarts, getCartById, createCart, updateCart, deleteCart };
