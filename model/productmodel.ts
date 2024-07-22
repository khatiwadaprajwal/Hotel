import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql';
import Category from './categorymodel';

class Product extends Model {
  public ProductID!: number;
  public Name!: string;
  public Description!: string;
  public Price!: number;
  public CategoryID!: number;
  public ImageURL!: string;
}

Product.init({
  ProductID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Description: {
    type: DataTypes.TEXT,
  },
  Price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  CategoryID: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'CategoryID',
    },
  },
  ImageURL: {
    type: DataTypes.STRING(255),
  },
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'Product',
  timestamps: false,
});

Product.belongsTo(Category, { foreignKey: 'CategoryID' });

export default Product;
