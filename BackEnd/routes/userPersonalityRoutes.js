import express from "express";
import {
    createUserPersonality,
    getUserPersonality,
    updateUserSWOT,
} from "../Controllers/userPersonalityController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();


// Créer un profil après test
router.post('/', createUserPersonality);

// Récupérer le profil d’un utilisateur
router.get('/:userId', getUserPersonality);

// Modifier le SWOT
router.put('/:userId/swot', updateUserSWOT);
export default router;
