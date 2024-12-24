import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql'; // Adjust path if needed
import User from './usermodel'; // Ensure path is correct

class Cart extends Model {
  public CartID!: number;
  public UserID!: number;
}

// Initialize the Cart model
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

// Define associations
Cart.belongsTo(User, { foreignKey: 'UserID' });
User.hasMany(Cart, { foreignKey: 'UserID' });

export default Cart;
