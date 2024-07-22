import { Request, Response } from 'express';
import ProductIngredient from '../model/productingredentmodel';

export const getAllProductIngredients = async (req: Request, res: Response) => {
  try {
    const productIngredients = await ProductIngredient.findAll();
    res.status(200).json(productIngredients);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductIngredientById = async (req: Request, res: Response) => {
  try {
    const productIngredient = await ProductIngredient.findByPk(req.params.id);
    if (productIngredient) {
      res.status(200).json(productIngredient);
    } else {
      res.status(404).json({ message: 'Product Ingredient not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProductIngredient = async (req: Request, res: Response) => {
  try {
    const newProductIngredient = await ProductIngredient.create(req.body);
    res.status(201).json(newProductIngredient);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductIngredient = async (req: Request, res: Response) => {
  try {
    const productIngredient = await ProductIngredient.findByPk(req.params.id);
    if (productIngredient) {
      await productIngredient.update(req.body);
      res.status(200).json(productIngredient);
    } else {
      res.status(404).json({ message: 'Product Ingredient not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductIngredient = async (req: Request, res: Response) => {
  try {
    const productIngredient = await ProductIngredient.findByPk(req.params.id);
    if (productIngredient) {
      await productIngredient.destroy();
      res.status(200).json({ message: 'Product Ingredient deleted' });
    } else {
      res.status(404).json({ message: 'Product Ingredient not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
export default { getAllProductIngredients, getProductIngredientById, createProductIngredient, updateProductIngredient, deleteProductIngredient };