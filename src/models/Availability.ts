import mongoose, { Document, Schema, Model, model } from 'mongoose';

interface IAvailability extends Document {
  doctorId: mongoose.Types.ObjectId;
  day: string; // e.g., "Monday"
  startTime: string; // e.g., "09:00 AM"
  endTime: string; // e.g., "10:00 AM"
  maxAppointments: number; // Maximum appointments allowed for this slot
}

const availabilitySchema: Schema<IAvailability> = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    maxAppointments: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Availability: Model<IAvailability> = model<IAvailability>('Availability', availabilitySchema);

export default Availability;
