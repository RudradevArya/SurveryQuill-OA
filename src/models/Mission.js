import mongoose from 'mongoose';

const MissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  agency: { type: String, required: true },
  launchDate: { type: Date, required: true },
  status: { type: String, enum: ['Planned', 'In Progress', 'Completed', 'Failed'], required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Mission || mongoose.model('Mission', MissionSchema);