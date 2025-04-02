 import { Sequelize } from "sequelize";
 import dotenv from "dotenv";

 dotenv.config();

 
 export const sequelize = new Sequelize(process.env.AZURE_SQL_CONNECTION_STRING as string, {
   dialect: "mssql",
   logging: false,
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
