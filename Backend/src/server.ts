import dotenv from "dotenv";
dotenv.config();

import express from "express";
import copilotRoutes from "./routes/copilotRoutes";


import { sequelize } from "./config/db"; 
import { syncDatabase } from "./models/index";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // חשוב כדי לפרש את הבקשות כ-JSON

// חיבור נתיב ה-Copilot
app.use("/api", copilotRoutes); // כל הנתיבים של Copilot יהיו תחת /api


// Routes tabels DB
import supplierRoutes from './routes/supplierRoutes';
app.use("/api", supplierRoutes);

import userRoutes from './routes/userRoutes';
app.use("/api", userRoutes);

import eventRoutes from './routes/eventRoutes';
app.use("/api", eventRoutes);

import eventSupplierRoutes from './routes/eventSupplierRoutes';
app.use('/api', eventSupplierRoutes);

import photographerRoutes from "./routes/photographerRoutes";
app.use("/api", photographerRoutes);

import registerRoutes from "./routes/registerSupplierRoutes";
app.use("/api", registerRoutes);

import guestRoutes from "./routes/guestRoutes";
app.use("/api", guestRoutes);

import locationRoutes from "./routes/locationRoutes";
app.use("/api", locationRoutes);

import cateringRoutes from "./routes/cateringRoutes";
app.use("/api", cateringRoutes);

import speakerRoutes from "./routes/speakerRoutes";
app.use("/api", speakerRoutes);

// Start the server and connect to the database
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to the database.");

    await syncDatabase(); // Sync all models
    console.log("✅ Models synced successfully.");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting the server:", error);
    process.exit(1);
  }
};

// Run the server
startServer();