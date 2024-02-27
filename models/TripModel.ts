import mongoose from 'mongoose';
import { TRIP_LOCATION, TRIP_STATUS, TRIP_TYPE } from '../utils/constants';

export interface ITrip {
  tripStatus: string,
  tripType: string,
  tripFrom: string,
  tripTo: string,
  tripDate: Date,
  createdBy: mongoose.Types.ObjectId,
}

export interface ITripModel extends ITrip, Document {}

const TripSchema = new mongoose.Schema(
  {
    tripStatus: {
      type: String,
      enum: Object.values(TRIP_STATUS),
      default: TRIP_STATUS.PENDING,
    },
    tripType: {
      type: String,
      enum: Object.values(TRIP_TYPE),
      default: TRIP_TYPE.CLIENT_MEETING,
    },
    tripFrom: {
      type: String,
      default: TRIP_LOCATION.POA,
    },
    tripTo: {
      type: String,
      default: TRIP_LOCATION.FRA,
    },
    tripDate: {
      type: Date
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITripModel>('Trip', TripSchema);
