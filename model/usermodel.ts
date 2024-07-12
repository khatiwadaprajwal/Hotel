import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql';

class User extends Model {
  public UserID!: number;
  public Name!: string;
  public Email!: string;
  public Password!: string;
  public Phone?: string;
  public Address?: string;
  public Role!: 'Admin' | 'Customer';
}

User.init(
  {
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
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
      unique: true,
    },
    Password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    Address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Role: {
      type: DataTypes.ENUM('Admin', 'Customer'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'User',
  }
);

export default User;
