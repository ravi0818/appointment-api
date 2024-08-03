import mongoose, { Document, Schema } from "mongoose";

interface IClinic extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  address: string;
  contactNumber: string;
  email: string;
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
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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

export default mongoose.model<IClinic>("Clinic", ClinicSchema);
