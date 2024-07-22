import { Router } from 'express';
import { getAllReviews, getReviewById, createReview, updateReview, deleteReview } from '../controller/reviewcontroller';

const router = Router();

router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
