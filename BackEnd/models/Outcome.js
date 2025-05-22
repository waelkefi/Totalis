import mongoose from 'mongoose';
const { Schema } = mongoose;

const OutcomeSchema = new Schema({
  vision:              { type: Schema.Types.ObjectId, ref: 'Vision', required: true, index: true },
  title:               { type: String, required: true },
  description:         { type: String, default: '' },
  expectedCompletion:  { type: Date }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// virtual populate → milestones
OutcomeSchema.virtual('milestones', {
  ref: 'Milestone',
  localField: '_id',
  foreignField: 'outcome'
});

export default mongoose.model('Outcome', OutcomeSchema);
