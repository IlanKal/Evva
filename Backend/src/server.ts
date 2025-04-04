import dotenv from "dotenv";
import express from "express";
import copilotRoutes from "./routes/copilotRoutes";

import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // חשוב כדי לפרש את הבקשות כ-JSON

// חיבור נתיב ה-Copilot
app.use("/api", copilotRoutes); // כל הנתיבים של Copilot יהיו תחת /api

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
