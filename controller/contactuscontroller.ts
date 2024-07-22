import { Request, Response } from 'express';
import ContactUs from '../model/contactusmodel';

export const getAllContactUsMessages = async (req: Request, res: Response) => {
  try {
    const messages = await ContactUs.findAll();
    res.status(200).json(messages);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getContactUsMessageById = async (req: Request, res: Response) => {
  try {
    const message = await ContactUs.findByPk(req.params.id);
    if (message) {
      res.status(200).json(message);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const createContactUsMessage = async (req: Request, res: Response) => {
  try {
    const newMessage = await ContactUs.create(req.body);
    res.status(201).json(newMessage);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateContactUsMessage = async (req: Request, res: Response) => {
  try {
    const message = await ContactUs.findByPk(req.params.id);
    if (message) {
      await message.update(req.body);
      res.status(200).json(message);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContactUsMessage = async (req: Request, res: Response) => {
  try {
    const message = await ContactUs.findByPk(req.params.id);
    if (message) {
      await message.destroy();
      res.status(200).json({ message: 'Message deleted' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
export default { getAllContactUsMessages, getContactUsMessageById, createContactUsMessage, updateContactUsMessage, deleteContactUsMessage };