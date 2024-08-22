import mongoose, { Document, Schema } from 'mongoose';

interface IClinic extends Document {
  userId: mongoose.Types.ObjectId;
  name?: string;
  address?: string;
  contacts: {
    primaryPhone?: string;
    alternativePhone?: string;
    email: string;
  };
  profilePicture?: string;
}

const ClinicSchema: Schema<IClinic> = new Schema<IClinic>(
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

export default mongoose.model<IClinic>('Clinic', ClinicSchema);
