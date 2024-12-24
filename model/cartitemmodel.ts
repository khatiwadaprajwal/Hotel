import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql'; // Adjust path if needed
import Cart from './cartmodel'; // Ensure path is correct
import Product from './productmodel'; // Ensure path is correct

class CartItem extends Model {
  public CartItemID!: number;
  public CartID!: number;
  public ProductID!: number;
  public Quantity!: number;
}

CartItem.init({
  CartItemID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  CartID: {
    type: DataTypes.INTEGER,
    references: {
      model: Cart,
      key: 'CartID',
    },
  },
  ProductID: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'ProductID',
    },
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'CartItem',
  tableName: 'CartItem',
  timestamps: false,
});

// Define associations
CartItem.belongsTo(Cart, { foreignKey: 'CartID' });
CartItem.belongsTo(Product, { foreignKey: 'ProductID' });

export default CartItem;
