import mongoose, { Document, Schema, Model, model } from 'mongoose';

interface IDoctor extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  gender: string;
  description: string;
  specialization: string;
}

const doctorSchema: Schema<IDoctor> = new Schema(
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

const Doctor: Model<IDoctor> = model<IDoctor>('Doctor', doctorSchema);

export default Doctor;
