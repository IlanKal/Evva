import express from "express";
// import eventRoutes from "./routes/eventRoutes";
// import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
// app.use("/api", eventRoutes);
// app.use(errorHandler);

export default app;
