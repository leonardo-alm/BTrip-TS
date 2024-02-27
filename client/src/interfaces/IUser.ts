import mongoose from "mongoose";

export interface IUser {
    _id: mongoose.Types.ObjectId,
    email: string,
    name: string,
    lastName: string,
    password: string,
}