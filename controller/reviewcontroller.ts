import { Request, Response } from 'express';
import Review from '../model/reviewmodel';

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (review) {
      await review.update(req.body);
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (review) {
      await review.destroy();
      res.status(200).json({ message: 'Review deleted' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
export default { getAllReviews, getReviewById, createReview, updateReview, deleteReview };