import dotenv from 'dotenv';
dotenv.config();
//import { syncDatabase } from "./models";
import { sequelize } from './config/db';
import app from './app';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to the database.');

    // disable sync
     //await syncDatabase(); 

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error starting the server:', error);
    process.exit(1);
  }
};

startServer();
