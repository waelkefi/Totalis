import Action from '../models/Action.js';

export const createAction = async (req, res) => {
  try {
    const action = new Action(req.body);
    await action.save();
    res.status(201).json(action);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getActionsByGoal = async (req, res) => {
  try {
    const actions = await Action.find({ goal: req.params.goalId });
    res.json(actions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateAction = async (req, res) => {
  try {
    const action = await Action.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!action) return res.status(404).json({ message: 'Action not found' });
    res.json(action);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteAction = async (req, res) => {
  try {
    const action = await Action.findByIdAndDelete(req.params.id);
    if (!action) return res.status(404).json({ message: 'Action not found' });
    res.json({ message: 'Action deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};