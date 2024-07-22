import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql';

class Ingredient extends Model {
  public IngredientID!: number;
  public Name!: string;
  public Description!: string;
}

Ingredient.init({
  IngredientID: {
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
}, {
  sequelize,
  modelName: 'Ingredient',
  tableName: 'Ingredient',
  timestamps: false,
});

export default Ingredient;
