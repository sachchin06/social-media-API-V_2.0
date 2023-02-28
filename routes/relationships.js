import express from "express";

const router = express.Router();

import {
  getRelationship,
  addRelationship,
  removeRelationship,
} from "../controllers/relationship.js";

router.get("/", getRelationship);
router.post("/", addRelationship);
router.delete("/", removeRelationship);

export default router;
