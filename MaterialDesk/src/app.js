import express from "express";

import authRoutes from "./routes/auth.routes.js";
import equipmentRoutes from "./routes/equipment.routes.js";
import loanRoutes from "./routes/loans.routes.js";

import errorHandler from "./middlewares/error-handler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenue dans MaterialDesk API");
});

app.use("/api/auth", authRoutes);

app.use("/api/equipments", equipmentRoutes);

app.use("/api/loans", loanRoutes);

app.use(errorHandler);

export default app;