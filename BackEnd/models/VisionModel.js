import mongoose from 'mongoose';
const { Schema } = mongoose;

const VisionSchema = new Schema({
  user:    { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  area:    { type: String, required: true, enum: [ 'Personal Life','Career','Health & Fitness','Finances','Relationships','Spiritual Life' ] },
  description: { type: String, default: '' }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// virtual populate → outcomes
VisionSchema.virtual('outcomes', {
  ref: 'Outcome',
  localField: '_id',
  foreignField: 'vision'
});

export default mongoose.model('Vision', VisionSchema);
