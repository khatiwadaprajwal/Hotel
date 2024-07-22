import { Router } from 'express';
import { getAllIngredients, getIngredientById, createIngredient, updateIngredient, deleteIngredient } from '../controller/ingredentcontroller';

const router = Router();

router.get('/', getAllIngredients);
router.get('/:id', getIngredientById);
router.post('/', createIngredient);
router.put('/:id', updateIngredient);
router.delete('/:id', deleteIngredient);

export default router;
