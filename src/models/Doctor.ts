import mongoose, { Document, Schema } from 'mongoose';

interface IDoctor extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  description: string;
  specialization: string;
}

const DoctorSchema: Schema<IDoctor> = new Schema<IDoctor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    description: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDoctor>('Doctor', DoctorSchema);
