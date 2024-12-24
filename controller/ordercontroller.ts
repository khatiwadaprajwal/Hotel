import { Request, Response } from 'express';
import Order from '../model/odermodel';
import OrderItem from '../model/orderitemmodel';
import User from '../model/usermodel'; // Import the User model
import Product from '../model/productmodel'; // Import the Product model
import { log } from 'console';

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: 'OrderItems',
          include: [{ model: Product }],
        },
      ],
    });
    res.json(orders);
  } catch (error: any) {
    console.error('Error fetching all orders:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderItem, as: 'OrderItems' }]
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error:any) {
    console.error('Error fetching order by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const createOrder = async (req: Request, res: Response) => {
  const { UserID, OrderDate,  Status, items } = req.body; // items is an array of OrderItem
  try {
    const user = await User.findByPk(UserID);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const order = await Order.create({ UserID, OrderDate,  Status });

    // Create OrderItems
    if (items && items.length > 0) {
      const orderItems = items.map((item: any) => ({
        OrderID: order.OrderID,
        ProductID: item.ProductID,
        Quantity: item.Quantity,
        Price: item.Price,
      }));
      await OrderItem.bulkCreate(orderItems);
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const { UserID, OrderDate,  Status } = req.body;
    if (!UserID) {
      return res.status(400).json({ error: 'UserID is required' });
    }
    const user = await User.findByPk(UserID);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    order.UserID = UserID;
    order.OrderDate = OrderDate;
    
    order.Status = Status;
    await order.save();
    res.json(order);
  } catch (error: any) {
    console.error('Error updating order:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    // Find the order
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Delete associated OrderItems
    await OrderItem.destroy({ where: { OrderID: req.params.id } });

    // Delete the Order
    await order.destroy();
    res.json({ message: 'Order deleted' });
  } catch (error:any) {
    console.error('Error deleting order:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder };
