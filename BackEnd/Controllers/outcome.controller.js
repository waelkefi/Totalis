import Outcome from '../models/Outcome.js';

export const createOutcome = async (req, res) => {
  try {
    const outcome = new Outcome(req.body);
    await outcome.save();
    res.status(201).json(outcome);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOutcomesByVision = async (req, res) => {
  try {
    const outcomes = await Outcome.find({ vision: req.params.visionId })
      .populate({
        path: 'milestones',
        populate: {
          path: 'goals',
          populate: {
            path: 'actions'
          }
        }
      });
    res.json(outcomes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateOutcome = async (req, res) => {
  try {
    const outcome = await Outcome.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!outcome) return res.status(404).json({ message: 'Outcome not found' });
    res.json(outcome);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteOutcome = async (req, res) => {
  try {
    const outcome = await Outcome.findByIdAndDelete(req.params.id);
    if (!outcome) return res.status(404).json({ message: 'Outcome not found' });
    res.json({ message: 'Outcome deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};