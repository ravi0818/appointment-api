import mongoose, { Document, Schema } from "mongoose";

interface IPatient extends Document {
  userId: mongoose.Types.ObjectId;
  name?: string;
  age?: number;
  gender?: string;
  address?: string;
  contacts: {
    primaryPhone?: string;
    alternativePhone?: string; // Optional field for an alternative phone number
    email: string;
  };
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema: Schema = new Schema<IPatient>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
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
      },
    },
    profilePicture: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPatient>("Patient", PatientSchema);
