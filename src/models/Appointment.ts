import mongoose, { Document, Schema } from 'mongoose';

interface IAppointment extends Document {
  doctorId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  availabilityId: mongoose.Types.ObjectId;
  date: Date;
  status: 'booked' | 'cancelled' | 'completed';
}

const AppointmentSchema: Schema<IAppointment> = new Schema<IAppointment>(
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

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);
