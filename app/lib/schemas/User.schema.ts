"use server";

import { Schema } from "mongoose";
import { mongoose } from "@/lib/db";



const StockSchema: Schema = new Schema({
	symbol: { type: String, required: true },
	name: { type: String, required: true },
	addedAt: { type: Date, default: Date.now }
});

const WatchlistGroupSchema: Schema = new Schema({
	groupName: { type: String, required: true },
	stocks: [StockSchema]
});


const UserSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		watchList: [WatchlistGroupSchema]
	},
	{
		timestamps: true,
	}
)
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;