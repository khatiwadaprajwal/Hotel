import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql';

class ContactUs extends Model {
  public ContactUsID!: number;
  public Name!: string;
  public Email!: string;
  public Subject!: string;
  public Message!: string;
  public Date!: Date;
}

ContactUs.init({
  ContactUsID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Subject: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'ContactUs',
  tableName: 'ContactUs',
  timestamps: false,
});

export default ContactUs;
