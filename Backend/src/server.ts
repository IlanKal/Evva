import dotenv from "dotenv";
import express from "express";
import copilotRoutes from "./routes/copilotRoutes"; // ייבוא הנתיב של Copilot

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // חשוב כדי לפרש את הבקשות כ-JSON

// חיבור נתיב ה-Copilot
app.use("/api", copilotRoutes); // כל הנתיבים של Copilot יהיו תחת /api

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running at http://localhost:${PORT}`);
//   });
// });
