import Trip from '../models/TripModel';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

type Query = {
  createdBy: string;
  tripStatus?: string;
  tripType?: string;
  tripTo?: {};
}

interface TripStats {
  pending: number;
  confirmed: number;
  cancelled: number;
}

export const getMyTrips = async (req: Request, res: Response) => {
  const { search, tripStatus, tripType, sort } = req.query;

  const queryObject: Query = {
    createdBy: req.currentUser!.userId,
  };

  if (search) {
    queryObject.tripTo = { $regex: search, $options: 'i' }
  }

  if (tripStatus && tripStatus !== 'all') {
    queryObject.tripStatus = tripStatus.toString();
  }

  if (tripType && tripType !== 'all') {
    queryObject.tripType = tripType.toString();
  }

  const sortOptions: { [key: string]: string } = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'tripTo',
    'z-a': '-tripTo',
  };

  const sortKey = sortOptions[sort as string] || sortOptions.newest;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const trips = await Trip.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalTrips = await Trip.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTrips / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalTrips, numOfPages, currentPage: page, trips });
};

export const createTrip = async (req: Request, res: Response) => {
  req.body.createdBy = req.currentUser!.userId;
  
  const trip = await Trip.create(req.body);
  
  res.status(StatusCodes.CREATED).json({ trip });
};

export const getTrip = async (req: Request, res: Response) => {
  const trip = await Trip.findById(req.params.id);
  res.status(StatusCodes.OK).json({ trip });
};

export const updateTrip = async (req: Request, res: Response) => {
  const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: 'trip modified', trip: updatedTrip });
};

export const deleteTrip = async (req: Request, res: Response) => {
  const removedTrip = await Trip.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: 'trip deleted', trip: removedTrip });
};

export const showStats = async (req: Request, res: Response) => {
  let stats;
  
  try {
    stats = await Trip.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.currentUser!.userId) } },
      { $group: { _id: '$tripStatus', count: { $sum: 1 } } },
    ]);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }

  if (!Array.isArray(stats)) {
    console.error('Invalid stats format:', stats);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Invalid Stats Format' });
  }

  const defaultStats: TripStats = {
    pending: 0,
    confirmed: 0,
    cancelled: 0,
  };

  stats.forEach((stat) => {
    const { _id: title, count } = stat;
    if (title === 'pending') {
      defaultStats.pending = count;
    } else if (title === 'confirmed') {
      defaultStats.confirmed = count;
    } else if (title === 'cancelled') {
      defaultStats.cancelled = count;
    }
  });

  res.status(StatusCodes.OK).json({ defaultStats });
};
