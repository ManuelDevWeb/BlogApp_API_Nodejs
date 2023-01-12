// Express
import express from "express";

const router = express.Router();

// ROUTES

// Get posts
router.get("/", (req, res) => {
  res.json("This is post");
});

export default router;
