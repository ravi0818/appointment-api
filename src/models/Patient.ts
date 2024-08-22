import mongoose, { Document, Schema } from 'mongoose';

interface IPatient extends Document {
  userId: mongoose.Types.ObjectId;
  name?: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  address?: string;
  contacts: {
    primaryPhone?: string;
    alternativePhone?: string;
    email: string;
  };
  profilePicture?: string;
}

const PatientSchema: Schema<IPatient> = new Schema<IPatient>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    address: {
      type: String,
      trim: true,
    },
    contacts: {
      primaryPhone: {
        type: String,
        trim: true,
      },
      alternativePhone: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
      },
    },
    profilePicture: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPatient>('Patient', PatientSchema);
