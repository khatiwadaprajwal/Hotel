import { Router } from 'express';
import { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment,createPayPalPayment,
     } from '../controller/paymentcontroller';

const router = Router();

router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.post('/', createPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);
router.post('/paypal', createPayPalPayment); // Create a payment order
//router.post('/paypal/:orderId/capture', capturePayPalPayment); // Capture payment

export default router;
