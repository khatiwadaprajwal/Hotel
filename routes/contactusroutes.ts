import { Router } from 'express';
import { getAllContactUsMessages, getContactUsMessageById, createContactUsMessage, updateContactUsMessage, deleteContactUsMessage } from '../controller/contactuscontroller';

const router = Router();

router.get('/', getAllContactUsMessages);
router.get('/:id', getContactUsMessageById);
router.post('/', createContactUsMessage);
router.put('/:id', updateContactUsMessage);
router.delete('/:id', deleteContactUsMessage);

export default router;
