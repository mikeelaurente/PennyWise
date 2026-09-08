import express from "express";
import morgan from "morgan";
import { createRoutes } from "./routes.js";
import { errorHandler } from "./shared/utils/error-handler.util.js";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "PennyWise API is running",
  });
});

createRoutes(app);

app.use(errorHandler);
