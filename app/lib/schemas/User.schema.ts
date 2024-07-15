"use server";

import {  Schema } from "mongoose";
import { mongoose } from "@/lib/db";

const UserSchema = new Schema ( 
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true,
    }
)
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;