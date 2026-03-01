import express from "express";
import { getStats } from "../controllers/stats.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();
router.get("/",authenticate,getStats);

export default router;