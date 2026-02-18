import express from "express";
import multer from "multer";
import path from "path";
import upload from "../middlewares/upload.js"
import { authenticate } from "../middlewares/auth.js";
import { updateUserProfile, getCurrentUser } from "../controllers/users.js";





const router = express.Router();



router.get("/me", authenticate, getCurrentUser);
router.patch("/profile",authenticate, upload.single("profile_photo"), updateUserProfile);
export default router;