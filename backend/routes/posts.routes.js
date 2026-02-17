import express from "express";
import multer from "multer";
import path from "path";
import upload from "../middlewares/upload.js"
import { authenticate } from "../middlewares/auth.js";
import {
    getAllPosts,
    getPostById,
    getEditPage,
    createPost,
    updatePost,
    deletePost,
} from "../controllers/posts.js";









const router = express.Router();
// const upload = multer({
//   dest: path.join("public", "uploads")
// });

router.get("/",getAllPosts);
router.get("/:id",getPostById);
router.get("/:id/edit", getEditPage);
router.post("/", authenticate, upload.single("image"), createPost);
router.patch("/:id",authenticate, upload.single("image"), updatePost);
router.delete("/:id",authenticate,deletePost);

export default router;