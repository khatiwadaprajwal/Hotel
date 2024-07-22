import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql';
import Product from './productmodel';
import Ingredient from './ingredentmodel';

class ProductIngredient extends Model {
  public ProductIngredientID!: number;
  public ProductID!: number;
  public IngredientID!: number;
  public Quantity!: string;
}

ProductIngredient.init({
  ProductIngredientID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ProductID: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'ProductID',
    },
  },
  IngredientID: {
    type: DataTypes.INTEGER,
    references: {
      model: Ingredient,
      key: 'IngredientID',
    },
  },
  Quantity: {
    type: DataTypes.STRING(100),
  },
}, {
  sequelize,
  modelName: 'ProductIngredient',
  tableName: 'ProductIngredient',
  timestamps: false,
});

ProductIngredient.belongsTo(Product, { foreignKey: 'ProductID' });
ProductIngredient.belongsTo(Ingredient, { foreignKey: 'IngredientID' });

export default ProductIngredient;
