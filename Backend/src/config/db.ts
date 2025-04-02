import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Define the environment variables
const DB_HOST = process.env.DB_HOST || 'evvaserver.database.windows.net';
const DB_NAME = process.env.DB_NAME || 'EVVADB';
const DB_USER = process.env.DB_USER || 'evva_admin';
const DB_PASS = process.env.DB_PASS || 'Ev#01121990';

// Create and export the sequelize instance with more detailed options
export const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  port: 1433, // Default port for SQL Server
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: false,
      connectTimeout: 30000,
      requestTimeout: 30000,
      // Try with domain username format
      authentication: {
        type: 'default',
        options: {
          userName: DB_USER,
          password: DB_PASS
        }
      }
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to Azure SQL Database.");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};