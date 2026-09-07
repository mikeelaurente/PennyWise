import { Router } from "express";
import * as AuthHandlers from "../auth/auth.controller.js";
import { isAuthenticated } from "../../middleware/authorization.middleware.js";

const router = Router();

router.post("/register", AuthHandlers.registerUser);
router.post("/login", AuthHandlers.logInUser);
router.get("/me", isAuthenticated, AuthHandlers.getCurrentUser);

export default router;
