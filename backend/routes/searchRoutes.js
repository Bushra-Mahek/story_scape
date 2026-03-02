import express from "express";
import { getSearch } from "../controllers/search.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",authenticate,getSearch);
export default router;