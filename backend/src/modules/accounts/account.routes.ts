import { Router } from "express";
import * as AccountHandler from "./account.controller.js";
import { isAuthenticated } from "../../middleware/authorization.middleware.js";

const router = Router();

router.use(isAuthenticated);

router.post("/", AccountHandler.createAccountHandler);
router.get("/", AccountHandler.getAllAccountsHandler);
router.get("/:id", AccountHandler.getAccountHandler);
router.patch("/:id/status", AccountHandler.updateAccountStatusHandler);
router.patch("/:id", AccountHandler.updateAccountDataHandler);

export default router;
