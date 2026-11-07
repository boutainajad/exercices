import express from "express";

import {
  getEquipments,
  getEquipmentStats,
  getEquipmentById,
  createEquipment
} from "../controllers/equipment.controller.js";

import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getEquipments);

router.get("/stats", getEquipmentStats);

router.get("/:id", getEquipmentById);

router.post("/", authorize("admin"), createEquipment);

export default router;