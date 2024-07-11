// config/mysql.ts

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

// Set the path to your .env file based on your project structure
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST as string,
    dialect: 'mysql',
    logging: false, // Disable logging; default: console.log
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export default sequelize;
