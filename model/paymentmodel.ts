import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql';
import Order from './odermodel';

class Payment extends Model {
  public PaymentID!: number;
  public OrderID!: number;
  public PaymentMethod!: string;
  public PaymentDate!: Date;
  public Amount!: number;
  public TransactionID!: string;
}

Payment.init({
  PaymentID: {
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
  PaymentMethod: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  PaymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  TransactionID: {
    type: DataTypes.STRING(100),
  },
}, {
  sequelize,
  modelName: 'Payment',
  tableName: 'Payment',
  timestamps: false,
});

Payment.belongsTo(Order, { foreignKey: 'OrderID' });

export default Payment;
