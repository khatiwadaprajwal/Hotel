import express, { Application } from 'express';
import sequelize from './config/mysql';
import appRoutes from './routes/approute';
import dotenv from 'dotenv';

// Import models
import User from './model/usermodel';
import Cart from './model/cartmodel';
import CartItem from './model/cartitemmodel';
import Product from './model/productmodel';
import Order from './model/odermodel';
import OrderItem from './model/orderitemmodel';
import Payment from './model/paymentmodel'; // Import your Payment model

dotenv.config();

const app: Application = express();
const port = 3000;

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes setup
app.use('/v1', appRoutes);

// Define associations
User.hasMany(Cart, { foreignKey: 'UserID' });
Cart.belongsTo(User, { foreignKey: 'UserID' });

Cart.hasMany(CartItem, { foreignKey: 'CartID', as: 'CartItems' });
CartItem.belongsTo(Cart, { foreignKey: 'CartID' });
CartItem.belongsTo(Product, { foreignKey: 'ProductID' });
Product.hasMany(CartItem, { foreignKey: 'ProductID' });

User.hasMany(Order, { foreignKey: 'UserID' });
Order.belongsTo(User, { foreignKey: 'UserID' });

Order.hasMany(OrderItem, { foreignKey: 'OrderID', as: 'OrderItems' });
OrderItem.belongsTo(Order, { foreignKey: 'OrderID' });
OrderItem.belongsTo(Product, { foreignKey: 'ProductID' });
Product.hasMany(OrderItem, { foreignKey: 'ProductID' });

Payment.belongsTo(Order, { foreignKey: 'OrderID' }); // Define the Payment association with Order

// Sync all models with the database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables updated!');
  })
  .catch((error) => console.log('This error occurred', error));

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Define a route for the root path ('/')
app.get('/', (req, res) => {
  res.send('Hello, setting project in TypeScript!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
