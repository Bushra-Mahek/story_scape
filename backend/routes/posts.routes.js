import express from "express";
import upload from "../middlewares/upload.js"
import { authenticate } from "../middlewares/auth.js";
import {
    getAllPosts,
    getPostById,
    getEditPage,
    getPostsByUserId,
    createPost,
    updatePost,
    deletePost,
    getPostsByUser,
} from "../controllers/posts.js";
import { createLike,deleteLike } from "../controllers/likes.js"









const router = express.Router();
// const upload = multer({
//   dest: path.join("public", "uploads")
// });

router.get("/",authenticate, getAllPosts);
router.get("/my-posts", authenticate, getPostsByUser);
//imp /usr/:id is before /:id  Otherwise /user/4 will be treated as id = "user".
router.get("/user/:id", authenticate, getPostsByUserId);



router.post("/", authenticate, upload.single("image"), createPost);


router.post("/:id/like",authenticate,createLike);
router.delete("/:id/like",authenticate,deleteLike);


router.get("/:id/edit", authenticate, getEditPage);
router.get("/:id",authenticate, getPostById);
router.patch("/:id",authenticate, upload.single("image"), updatePost);
router.delete("/:id",authenticate,deletePost);



export default router;