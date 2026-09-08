import express from "express";
import authRoute from "./modules/auth/auth.routes.js";
import accountRoute from "./modules/accounts/account.route.js";

export const createRoutes = (app: express.Router) => {
  app.use("/api/auth", authRoute);
  app.use("/api/accounts", accountRoute);
};
