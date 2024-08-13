import mongoose, { Document, Schema, Model, model } from 'mongoose';

interface IAppointment extends Document {
  doctorId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  availabilityId: mongoose.Types.ObjectId;
  date: Date; // Specific date for the appointment
  status: string; // e.g., "booked", "cancelled", "completed"
}

const appointmentSchema: Schema<IAppointment> = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    availabilityId: {
      type: Schema.Types.ObjectId,
      ref: 'Availability',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['booked', 'cancelled', 'completed'],
      default: 'booked',
    },
  },
  {
    timestamps: true,
  }
);

const Appointment: Model<IAppointment> = model<IAppointment>('Appointment', appointmentSchema);

export default Appointment;
