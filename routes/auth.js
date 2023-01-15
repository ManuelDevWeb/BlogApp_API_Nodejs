// Express
import express from "express";

// Controller
import { register, login, logout } from "../controllers/auth.js";

const router = express.Router();

// ROUTES

// Registrar usuario
router.post("/register", register);

// Iniciar sesion
router.post("/login", login);

// Cerrar sesion
router.post("/logout", logout);

export default router;
