import express from 'express';
import {
  createMilestone,
  getMilestonesByOutcome,
  updateMilestone,
  deleteMilestone
} from '../controllers/milestone.controller.js';

const router = express.Router();

router.post('/', createMilestone);
router.get('/outcome/:outcomeId', getMilestonesByOutcome);
router.put('/:id', updateMilestone);
router.delete('/:id', deleteMilestone);

export default router;