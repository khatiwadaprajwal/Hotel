import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql";
import Order from "./odermodel";

class Payment extends Model {
  public PaymentID!: number;
  public OrderID!: number;
  public PaymentMethod!: string;
  public PaymentDate!: Date;
  public Amount!: number;
  public TransactionID!: string;
  public PaymentStatus!: string;
  public Currency!: string;
}

Payment.init(
  {
    PaymentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PaymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PaymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    Amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    TransactionID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PaymentStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Pending",
    },
    Currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USD",
    },
  },
  {
    sequelize,
    modelName: "Payment",
    timestamps: true, // Enable createdAt and updatedAt
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

// Associations
Payment.belongsTo(Order, { foreignKey: "OrderID" });

export default Payment;
