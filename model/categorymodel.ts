import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql';

class Category extends Model {
  public CategoryID!: number;
  public CategoryName!: string;
}

Category.init({
  CategoryID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  CategoryName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'Category',
  timestamps: false,
});

export default Category;
