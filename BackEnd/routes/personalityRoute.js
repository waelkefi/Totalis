


import express from "express";
import {
    createPersonalityModel,
    getAllModels,
    getModelByType,
    updateModel,
    deleteModel,
    getModelById
} from "../Controllers/personnalityController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/', createPersonalityModel);
router.get('/', getAllModels);
router.get('/:type',getModelByType);
router.get('/byId/:id',getModelById);
router.put('/:type', updateModel);
router.delete('/:type', deleteModel);
export default router;
