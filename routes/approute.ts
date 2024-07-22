import express, { Router } from 'express';
import authRoutes from './authroutes';
import userRoutes from './userroute';
import productRoutes from './productroutes';
import categoryRoutes from './categoryroutes';
import ingredientRoutes from './ingredientroutes';
import orderRoutes from './orderroutes';
import orderItemRoutes from './orderitemroutes';
import reviewRoutes from './reviewroutes';
import paymentRoutes from './paymentroutes';
import testimonialRoutes from './testimonialroutes';
import contactUsRoutes from './contactusroutes';
import cartRoutes from './cartroutes';
import cartItemRoutes from './cartitemroutes';

const router: Router = express.Router();

// Route definitions
router.use('/products', productRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/orders', orderRoutes);
router.use('/order-items', orderItemRoutes);
router.use('/reviews', reviewRoutes);
router.use('/payments', paymentRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/contact-us', contactUsRoutes);
router.use('/carts', cartRoutes);
router.use('/cart-items', cartItemRoutes);

// Fallback route for undefined routes
router.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default router;
