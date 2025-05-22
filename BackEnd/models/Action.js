// import mongoose from 'mongoose';
// const { Schema } = mongoose;

// const ActionSchema = new Schema({
//   goal:        { type: Schema.Types.ObjectId, ref: 'Goal', required: true, index: true },
//   title:       { type: String, required: true },
//   description: { type: String, default: '' },
//   status:      { type: String, enum: ['todo','completed'], default: 'todo' },
//   projected:   { type: Boolean, default: false },
//   dateTime:    { type: Date, default: Date.now }
// }, { timestamps: true });

// export default mongoose.model('Action', ActionSchema);

import mongoose from 'mongoose';
const { Schema } = mongoose;

const ActionSchema = new Schema({
  goal:      { type: Schema.Types.ObjectId, ref: 'Goal', required: true, index: true },
  title:     { type: String, required: true },
  status:    { type: String, enum: ['todo', 'completed'], default: 'todo' },
  date:      { type: Date, required: true }, // anciennement dateTime
  startHour: { type: String, required: true }, // format HH:mm (ex: '08:30')
  endHour:   { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Action', ActionSchema);
