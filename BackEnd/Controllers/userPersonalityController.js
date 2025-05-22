
import {UserPersonality} from '../models/UserPersonnality.js';

export const createUserPersonality = async (req, res) => {
  try {
    const {
      userId,
      type,  // exemple : "ENTP"
      role,
      description,
      categorie,
      swot,             // complet : { forces, faiblesses, opportunites, menaces }
      testResult        // ex: { E: 6, I: 4, ... }
    } = req.body;

    // Vérifier s’il a déjà un profil (optionnel mais recommandé)
    const existing = await UserPersonality.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: 'User already has a personality profile' });
    }

    // Créer le profil
    const newProfile = new UserPersonality({
      userId,
      type,
      role,
      description,
      categorie,
      swot,
      testResult,
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.error("Erreur serveur:", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


// Récupérer le profil d’un utilisateur
export const getUserPersonality = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await UserPersonality.findOne({ userId });

    if (!profile) return res.status(404).json({ message: 'Profil non trouvé' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Modifier le SWOT personnalisé
export const updateUserSWOT = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { swot } = req.body;

    const updatedProfile = await UserPersonality.findOneAndUpdate(
      { userId },
      { $set: { swot } },
      { new: true }
    );

    if (!updatedProfile) return res.status(404).json({ message: 'Profil non trouvé' });
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
