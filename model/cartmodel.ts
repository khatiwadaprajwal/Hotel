import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql';
import User from './usermodel';

class Cart extends Model {
  public CartID!: number;
  public UserID!: number;
}

Cart.init({
  CartID: {
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
}, {
  sequelize,
  modelName: 'Cart',
  tableName: 'Cart',
  timestamps: false,
});

Cart.belongsTo(User, { foreignKey: 'UserID' });

export default Cart;
