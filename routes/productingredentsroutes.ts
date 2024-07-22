import { Router } from 'express';
import { getAllProductIngredients, getProductIngredientById, createProductIngredient, updateProductIngredient, deleteProductIngredient } from '../controller/productingredentcontroller';

const router = Router();

router.get('/', getAllProductIngredients);
router.get('/:id', getProductIngredientById);
router.post('/', createProductIngredient);
router.put('/:id', updateProductIngredient);
router.delete('/:id', deleteProductIngredient);

export default router;
