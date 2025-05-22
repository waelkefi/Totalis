import express from 'express';
import {
  createVision,
  getAllVisions,
  getVisionById,
  updateVision,
  deleteVision,
  getVisionByUserId
} from '../controllers/vision.controller.js';

const router = express.Router();

router.post('/', createVision);
router.get('/', getAllVisions);
router.get('/:id', getVisionById);
router.put('/:id', updateVision);
router.delete('/:id', deleteVision);
router.get('/user/:userId', getVisionByUserId);
export default router;