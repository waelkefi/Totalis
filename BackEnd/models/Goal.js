import mongoose from 'mongoose';
const { Schema } = mongoose;

const GoalSchema = new Schema({
  milestone: { type: Schema.Types.ObjectId, ref: 'Milestone', required: true, index: true },
  title:     { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate:   { type: Date, required: true }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

GoalSchema.virtual('actions', {
  ref: 'Action',
  localField: '_id',
  foreignField: 'goal'
});

export default mongoose.model('Goal', GoalSchema);
