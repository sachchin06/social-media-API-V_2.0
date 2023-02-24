import express from "express";

const router = express.Router();

import { getAllPosts } from "../controllers/post.js";

router.get("/", getAllPosts);

export default router;
