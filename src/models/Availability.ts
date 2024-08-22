import mongoose, { Document, Schema } from 'mongoose';

interface IAvailability extends Document {
  doctorId: mongoose.Types.ObjectId;
  day: string;
  startTime: string;
  endTime: string;
  maxAppointments: number;
}

const AvailabilitySchema: Schema<IAvailability> = new Schema<IAvailability>(
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

export default mongoose.model<IAvailability>('Availability', AvailabilitySchema);
