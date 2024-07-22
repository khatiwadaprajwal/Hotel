import { Request, Response } from 'express';
import Ingredient from '../model/ingredentmodel';

export const getAllIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200).json(ingredients);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getIngredientById = async (req: Request, res: Response) => {
  try {
    const ingredient = await Ingredient.findByPk(req.params.id);
    if (ingredient) {
      res.status(200).json(ingredient);
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const createIngredient = async (req: Request, res: Response) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateIngredient = async (req: Request, res: Response) => {
  try {
    const ingredient = await Ingredient.findByPk(req.params.id);
    if (ingredient) {
      await ingredient.update(req.body);
      res.status(200).json(ingredient);
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteIngredient = async (req: Request, res: Response) => {
  try {
    const ingredient = await Ingredient.findByPk(req.params.id);
    if (ingredient) {
      await ingredient.destroy();
      res.status(200).json({ message: 'Ingredient deleted' });
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
export default { getAllIngredients, getIngredientById, createIngredient, updateIngredient, deleteIngredient };