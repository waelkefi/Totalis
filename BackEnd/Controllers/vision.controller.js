import Vision from '../models/VisionModel.js';

export const createVision = async (req, res) => {
  try {
    const { user, area, description } = req.body;
    const vision = new Vision({ user, area, description });
    await vision.save();
    res.status(201).json(vision);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllVisions = async (req, res) => {
  try {
    const visions = await Vision.find()
      .populate({
        path: 'outcomes',
        populate: {
          path: 'milestones',
          populate: {
            path: 'goals',
            populate: {
              path: 'actions'
            }
          }
        }
      });
    res.json(visions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getVisionById = async (req, res) => {
  try {
    const vision = await Vision.findById(req.params.id)
      .populate({
        path: 'outcomes',
        populate: {
          path: 'milestones',
          populate: {
            path: 'goals',
            populate: {
              path: 'actions'
            }
          }
        }
      });
    if (!vision) return res.status(404).json({ message: 'Vision not found' });
    res.json(vision);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
export const getVisionByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const visions = await Vision.find({ user: userId })
      .populate({
        path: 'outcomes',
        populate: {
          path: 'milestones',
          populate: {
            path: 'goals',
            populate: {
              path: 'actions'
            }
          }
        }
      });

    res.json(visions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateVision = async (req, res) => {
  try {
    const vision = await Vision.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vision) return res.status(404).json({ message: 'Vision not found' });
    res.json(vision);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteVision = async (req, res) => {
  try {
    const vision = await Vision.findByIdAndDelete(req.params.id);
    if (!vision) return res.status(404).json({ message: 'Vision not found' });
    res.json({ message: 'Vision deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};