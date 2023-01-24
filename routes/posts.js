// Express
import express from "express";

// Controller
import {
  getPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
} from "../controllers/posts.js";

const router = express.Router();

// ROUTES

// Obtener todos los posts
router.get("/", getPosts);

// Obtener un post especifico
router.get("/:id", getPost);

// Agregar post
router.post("/", addPost);

// Eliminar un post
router.delete("/:id", deletePost);

// Modificar un post
router.patch("/:id", updatePost);

export default router;
