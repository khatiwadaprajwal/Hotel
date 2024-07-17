import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql';

// Define the Temporary User model attributes
interface TempUserAttributes {
  TempUserID?: number; // Make TempUserID optional
  Name: string;
  Email: string;
  Password: string;
  Phone?: string;
  Address?: string;
  Role: 'Admin' | 'Customer';
  OTP: string;
  OTPExpiration: Date;
}

// Define the Temporary User model instance
export interface TempUserInstance extends Model<TempUserAttributes>, TempUserAttributes {}

// Define the Temporary User model
const TempUser = sequelize.define<TempUserInstance>('TempUser', {
  TempUserID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Phone: {
    type: DataTypes.STRING
  },
  Address: {
    type: DataTypes.STRING
  },
  Role: {
    type: DataTypes.ENUM('Admin', 'Customer'),
    allowNull: false
  },
  OTP: {
    type: DataTypes.STRING,
    allowNull: false
  },
  OTPExpiration: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

export default TempUser;
