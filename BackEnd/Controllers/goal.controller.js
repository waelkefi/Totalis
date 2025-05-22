import Goal from '../models/Goal.js';

export const createGoal = async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getGoalsByMilestone = async (req, res) => {
  try {
    const goals = await Goal.find({ milestone: req.params.milestoneId }).populate('actions');
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json({ message: 'Goal deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};