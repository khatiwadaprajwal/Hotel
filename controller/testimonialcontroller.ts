import { Request, Response } from 'express';
import Testimonial from '../model/testimonialmodel';

export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.status(200).json(testimonials);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTestimonialById = async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (testimonial) {
      res.status(200).json(testimonial);
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const newTestimonial = await Testimonial.create(req.body);
    res.status(201).json(newTestimonial);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (testimonial) {
      await testimonial.update(req.body);
      res.status(200).json(testimonial);
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (testimonial) {
      await testimonial.destroy();
      res.status(200).json({ message: 'Testimonial deleted' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
export default { getAllTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial };