import Milestone from '../models/Milestone.js';

export const createMilestone = async (req, res) => {
  try {
    const milestone = new Milestone(req.body);
    await milestone.save();
    res.status(201).json(milestone);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMilestonesByOutcome = async (req, res) => {
  try {
    const milestones = await Milestone.find({ outcome: req.params.outcomeId })
      .populate({
        path: 'goals',
        populate: {
          path: 'actions'
        }
      });
    res.json(milestones);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!milestone) return res.status(404).json({ message: 'Milestone not found' });
    res.json(milestone);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findByIdAndDelete(req.params.id);
    if (!milestone) return res.status(404).json({ message: 'Milestone not found' });
    res.json({ message: 'Milestone deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};