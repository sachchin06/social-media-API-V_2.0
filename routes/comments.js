import express from "express";

const router = express.Router();

import { getAllComments } from "../controllers/comment.js";

router.get("/", getAllComments);

export default router;
