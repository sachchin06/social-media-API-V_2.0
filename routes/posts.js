import express from "express";

const router = express.Router();

import { getAllPosts, addPost } from "../controllers/post.js";

router.get("/", getAllPosts);
router.post("/", addPost);

export default router;
