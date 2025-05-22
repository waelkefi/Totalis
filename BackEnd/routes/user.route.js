import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../Controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Récupérer tous les utilisateurs
router.get("/", getAllUsers);

// Récupérer un utilisateur par ID
router.get("/:id", getUserById);

// Mettre à jour un utilisateur
router.put("/:id", updateUser);

// Supprimer un utilisateur
router.delete("/:id", deleteUser);

export default router;
