import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql';
import User from './usermodel';

class Testimonial extends Model {
  public TestimonialID!: number;
  public UserID!: number;
  public Content!: string;
  public Date!: Date;
}

Testimonial.init({
  TestimonialID: {
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
  Content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Testimonial',
  tableName: 'Testimonial',
  timestamps: false,
});

Testimonial.belongsTo(User, { foreignKey: 'UserID' });

export default Testimonial;
