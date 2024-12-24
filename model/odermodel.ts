import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql'; // Adjust path if needed
import User from './usermodel';

class Order extends Model {
  public OrderID!: number;
  public UserID!: number;
  public OrderDate!: Date;
  public Status!: string;
}

Order.init({
  OrderID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  UserID: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'UserID',
    },
  },
  OrderDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'Order',
  timestamps: false,
});

// Define associations
Order.belongsTo(User, { foreignKey: 'UserID' });
User.hasMany(Order, { foreignKey: 'UserID' });

export default Order;
