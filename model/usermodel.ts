import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql';



// Define the User model attributes
interface UserAttributes {
  UserID: number;
  Name: string;
  Email: string;
  Password: string;
  Phone?: string;
  Address?: string;
  Role: 'Admin' | 'Customer';
  OTP?: string;
  OTPExpiration?: Date;
  Verified?: boolean;
}

// Define the User model instance
export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

// Define the User model
const User = sequelize.define<UserInstance>('User', {
  UserID: {
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
    type: DataTypes.STRING
  },
  OTPExpiration: {
    type: DataTypes.DATE
  },
  Verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default User;
