import express from "express";
import authRoute from "./modules/auth/auth.routes.js";
export const createRoutes = (app: express.Router) => {
  app.use("/api/auth", authRoute);
};
