// UserPersonality.js
import mongoose from "mongoose";

const SWOTSchema = new mongoose.Schema({
  forces: [String],
  faiblesses: [String],
  opportunites: [String],
  menaces: [String],
});

const TestResultSchema = new mongoose.Schema({
  I: Number,
  E: Number,
  N: Number,
  S: Number,
  T: Number,
  F: Number,
  J: Number,
  P: Number,
});

const UserPersonalitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  role: { type: String },
  description: { type: String },
  categorie: {
    type: String,
    enum: ['Analysts', 'Diplomats', 'Sentinels', 'Explorers'],
    required: true
  },
  swot: { type: SWOTSchema },
  testResult: { type: TestResultSchema },
  createdAt: { type: Date, default: Date.now }
});

export const UserPersonality = mongoose.model("UserPersonality", UserPersonalitySchema);