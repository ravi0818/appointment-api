import mongoose, { Document, Schema } from "mongoose";

interface IClinic extends Document {
  userId: mongoose.Types.ObjectId;
  name?: string;
  address?: string;
  contacts: {
    primaryPhone?: string;
    alternativePhone?: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ClinicSchema: Schema = new Schema<IClinic>(
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
      },
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

export default mongoose.model<IClinic>("Clinic", ClinicSchema);
