import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql';
import User from './usermodel';

class Order extends Model {
  public OrderID!: number;
  public UserID!: number;
  public OrderDate!: Date;
  public TotalAmount!: number;
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
  TotalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  Status: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'Order',
  timestamps: false,
});

Order.belongsTo(User, { foreignKey: 'UserID' });

export default Order;
