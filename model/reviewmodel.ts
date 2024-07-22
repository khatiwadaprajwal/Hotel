import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql';
import User from './usermodel';
import Product from './productmodel';

class Review extends Model {
  public ReviewID!: number;
  public UserID!: number;
  public ProductID!: number;
  public Rating!: number;
  public Comment!: string;
  public ReviewDate!: Date;
}

Review.init({
  ReviewID: {
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
  ProductID: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'ProductID',
    },
  },
  Rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Comment: {
    type: DataTypes.TEXT,
  },
  ReviewDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Review',
  tableName: 'Review',
  timestamps: false,
});

Review.belongsTo(User, { foreignKey: 'UserID' });
Review.belongsTo(Product, { foreignKey: 'ProductID' });

export default Review;
