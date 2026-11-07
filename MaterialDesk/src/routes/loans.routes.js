import express from "express";

import { getReturnedLoans } from "../controllers/loans.controller.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/returned", getReturnedLoans);

export default router;