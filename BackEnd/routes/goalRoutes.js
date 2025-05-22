import express from 'express';
import {
  createGoal,
  getGoalsByMilestone,
  updateGoal,
  deleteGoal
} from '../controllers/goal.controller.js';

const router = express.Router();

router.post('/', createGoal);
router.get('/milestone/:milestoneId', getGoalsByMilestone);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

export default router;