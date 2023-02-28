import express from "express";

const router = express.Router();

import { getAllComments, addComment } from "../controllers/comment.js";

router.get("/:postId", getAllComments);
router.post("/:postId", addComment);

export default router;
