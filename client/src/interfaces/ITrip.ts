import mongoose from 'mongoose';

export interface ITrip {
    _id: mongoose.Types.ObjectId,
    tripStatus: string,
    tripType: string,
    tripFrom: string,
    tripTo: string,
    tripDate: Date,
    createdAt: Date,
    updatedAt: Date,
    createdBy: mongoose.Types.ObjectId,
}