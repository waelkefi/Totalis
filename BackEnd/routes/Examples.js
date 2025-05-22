import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authorize.js";
import { createPack, getAllPacks, deletePack } from "../controllers/pack.controller.js";

const router = express.Router();

// Seuls les admins peuvent créer un pack
router.post("/", verifyToken, authorizeRoles("admin"), createPack);

// Tous les utilisateurs peuvent voir les packs
router.get("/", verifyToken, getAllPacks);

// Seuls les admins peuvent supprimer un pack
router.delete("/:packId", verifyToken, authorizeRoles("admin"), deletePack);

export default router;
router.get("/some-protected-route", verifyToken, authorizeRoles("startup", "pme", "service_provider"), (req, res) => {
    res.json({ success: true, message: "Bienvenue dans votre espace entreprise !" });
  });
  