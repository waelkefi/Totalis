import express from 'express';
import {
  createOutcome,
  getOutcomesByVision,
  updateOutcome,
  deleteOutcome
} from '../controllers/outcome.controller.js';

const router = express.Router();

router.post('/', createOutcome);
router.get('/vision/:visionId', getOutcomesByVision);
router.put('/:id', updateOutcome);
router.delete('/:id', deleteOutcome);

export default router;