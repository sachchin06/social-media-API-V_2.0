import express from "express";

const router = express.Router();

import { getAllLikes } from "../controllers/like.js";

router.get("/", getAllLikes);

export default router;
