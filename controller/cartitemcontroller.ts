import { Request, Response } from 'express';
import CartItem from '../model/cartitemmodel';
import Cart from '../model/cartmodel';
import Product from '../model/productmodel';

export const getAllCartItems = async (req: Request, res: Response) => {
  try {
    const cartItems = await CartItem.findAll({
      include: [{ model: Product }],
    });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCartItemById = async (req: Request, res: Response) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!cartItem) {
      return res.status(404).json({ error: 'CartItem not found' });
    }
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createCartItem = async (req: Request, res: Response) => {
  try {
    const { cartId, productId, quantity } = req.body;
    const cart = await Cart.findByPk(cartId);
    const product = await Product.findByPk(productId);
    if (!cart || !product) {
      return res.status(404).json({ error: 'Cart or Product not found' });
    }
    const cartItem = await CartItem.create({ CartID: cartId, ProductID: productId, Quantity: quantity });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'CartItem not found' });
    }
    const { cartId, productId, quantity } = req.body;
    cartItem.CartID = cartId;
    cartItem.ProductID = productId;
    cartItem.Quantity = quantity;
    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'CartItem not found' });
    }
    await cartItem.destroy();
    res.json({ message: 'CartItem deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { getAllCartItems, getCartItemById, createCartItem, updateCartItem, deleteCartItem };
