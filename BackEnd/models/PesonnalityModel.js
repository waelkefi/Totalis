import mongoose from "mongoose";



const SWOTSchema = new mongoose.Schema({
  forces: [String],
  faiblesses: [String],
  opportunites: [String],
  menaces: [String],
});

const PersonalityModelSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'],
    required: true
  },
  role: { type: String, required: true },
  description: { type: String, required: true },
  categorie: {
    type: String,
    enum: ['Analysts', 'Diplomats', 'Sentinels', 'Explorers'],
    required: true
  },
  swot: { type: SWOTSchema, required: true }
});

export const PersonalityModel = mongoose.model("PersonalityModel", PersonalityModelSchema);
