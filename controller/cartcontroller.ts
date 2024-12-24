import { Request, Response } from 'express';
import CartItem from '../model/cartitemmodel';
import Cart from '../model/cartmodel';
import Product from '../model/productmodel';
import User from '../model/usermodel'; // Import the User model

// Define your functions
export const getAllCarts = async (req: Request, res: Response) => {
  try {
    const carts = await Cart.findAll({
      include: [{ model: CartItem, as: 'CartItems' }],
    });
    res.json(carts);
  } catch (error: any) {
    console.error('Error fetching all carts:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCartById = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findByPk(req.params.id, {
      include: [{ model: CartItem, as: 'CartItems' }],
    });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart);
  } catch (error: any) {
    console.error('Error fetching cart by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createCart = async (req: Request, res: Response) => {
  const { UserID } = req.body;
  try {
    const user = await User.findByPk(UserID);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const cart = await Cart.create({ UserID });
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const { UserID } = req.body;
    if (!UserID) {
      return res.status(400).json({ error: 'UserID is required' });
    }
    const user = await User.findByPk(UserID);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    cart.UserID = UserID;
    await cart.save();
    res.json(cart);
  } catch (error: any) {
    console.error('Error updating cart:', error.message);
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
// Export all functions as named exports
export default { getAllCarts, getCartById, createCart, updateCart, deleteCart };
