import { Router } from 'express';
import { getAllCartItems, getCartItemById, createCartItem, updateCartItem, deleteCartItem } from '../controller/cartitemcontroller';

const router = Router();

router.get('/', getAllCartItems);
router.get('/:id', getCartItemById);
router.post('/', createCartItem);
router.put('/:id', updateCartItem);
router.delete('/:id', deleteCartItem);

export default router;
