import express from "express";

const router = express.Router();

import { getAllLikes, addLike, removeLike } from "../controllers/like.js";

router.get("/", getAllLikes);
router.post("/", addLike);
router.delete("/", removeLike);

export default router;
