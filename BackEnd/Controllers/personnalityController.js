import { PersonalityModel } from "../models/PesonnalityModel.js";

// ➕ Créer un type de personnalité (Admin)
export const createPersonalityModel = async (req, res) => {
  try {
    const { type, role, description, swot, categorie } = req.body;

    const existing = await PersonalityModel.findOne({ type });
    if (existing) return res.status(400).json({ message: 'Ce type existe déjà.' });

    const newModel = new PersonalityModel({ type, role, description, swot, categorie });
    await newModel.save();

    res.status(201).json(newModel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// 📄 Récupérer tous les types
export const getAllModels = async (req, res) => {
  try {
    const models = await PersonalityModel.find();
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// 📄 Récupérer un seul type
export const getModelByType = async (req, res) => {
  try {
    const { type } = req.params;
    const model = await PersonalityModel.findOne({ type });

    if (!model) return res.status(404).json({ message: 'Type non trouvé' });
    res.json(model);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
export const getModelById = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await PersonalityModel.findOne({ _id : id });

    if (!model) return res.status(404).json({ message: 'Type non trouvé' });
    res.json(model);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
// ✏️ Modifier un type
export const updateModel = async (req, res) => {
  try {
    const { type } = req.params;
    const updatedData = req.body;

    const updated = await PersonalityModel.findOneAndUpdate(
      { type },
      { $set: updatedData },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Type non trouvé' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ❌ Supprimer un type
export const deleteModel = async (req, res) => {
  try {
    const { type } = req.params;
    const deleted = await PersonalityModel.findOneAndDelete({ type });

    if (!deleted) return res.status(404).json({ message: 'Type non trouvé' });
    res.json({ message: 'Type supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
