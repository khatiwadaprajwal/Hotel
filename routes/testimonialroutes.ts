import { Router } from 'express';
import { getAllTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial } from '../controller/testimonialcontroller';

const router = Router();

router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);
router.post('/', createTestimonial);
router.put('/:id', updateTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;
