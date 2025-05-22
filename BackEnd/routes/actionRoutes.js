import express from 'express';
import {
  createAction,
  getActionsByGoal,
  updateAction,
  deleteAction
} from '../controllers/action.controller.js';

const router = express.Router();

router.post('/', createAction);
router.get('/goal/:goalId', getActionsByGoal);
router.put('/:id', updateAction);
router.delete('/:id', deleteAction);

export default router;