import mongoose from 'mongoose';
const { Schema } = mongoose;

const MilestoneSchema = new Schema({
  outcome: { type: Schema.Types.ObjectId, ref: 'Outcome', required: true, index: true },
  title:   { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

MilestoneSchema.virtual('goals', {
  ref: 'Goal',
  localField: '_id',
  foreignField: 'milestone'
});

export default mongoose.model('Milestone', MilestoneSchema);
