import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql';
import Order from './odermodel';
import Product from './productmodel';

class OrderItem extends Model {
  public OrderItemID!: number;
  public OrderID!: number;
  public ProductID!: number;
  public Quantity!: number;
  public Price!: number;
}

OrderItem.init({
  OrderItemID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  OrderID: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'OrderID',
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
  Price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'OrderItem',
  tableName: 'OrderItem',
  timestamps: false,
});

OrderItem.belongsTo(Order, { foreignKey: 'OrderID' });
OrderItem.belongsTo(Product, { foreignKey: 'ProductID' });

export default OrderItem;
