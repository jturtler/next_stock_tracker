
import { mongoose } from "@/lib/db"; // Have to have this import so that we can connect database
import { JSONObject } from "@/lib/definations";
import User from '@/lib/schemas/User.schema';
import * as Utils from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import * as Encrypt from "./encryptPassword";
import { Document } from "mongoose";


export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
``
	const email = searchParams.get("email");
	const password = searchParams.get("password");
	const searchResult = await User.find(({email}));

	// Find the users with the password if there is password in parametters
	let matchedUser: Document | null = null;
	for( let i=0; i< searchResult.length; i++ ) {
		const user = searchResult[i];
		const matched = await Encrypt.comparePassword( password!, user.password );
		if( matched ) {
			matchedUser = user;
			break;
		}
	}
	return NextResponse.json(matchedUser, { status: 200 });
}

export async function POST(request: NextRequest) {
	const payload: JSONObject = await request.json();

	// Hash(encrypt) password before creating
	const password = payload.password;
	payload.password = await Encrypt.hashPassword( password );

	const newUser = await User.create(payload);

	return NextResponse.json(newUser, { status: 200 });
}


export async function PUT(request: NextRequest) {
	// payload : {mode: "add/remove", userId: "xxx", groupName: "", stock: watchlist item}
	const payload: JSONObject = await request.json();
	const { action, userId, groupName, stock } = payload;

	// // { new: true } --> return the modified document rather than the original one
    // const newUser = await User.findByIdAndUpdate(payload._id, payload, { new: true, runValidators: true });

	// return NextResponse.json(newUser, { status: 200 });

	
	// if( action == "add" ) {
	// 	try {
	// 		const userData = await User.updateOne(
	// 			{ _id: userId, "watchlist.groupName": groupName },
	// 			{ $push: { "watchlist.$.stocks": stock } },
	// 			{ new: true }
	// 		);
	// 		// console.log('Stock added to watchlist successfully.');
	// 		return NextResponse.json(userData, { status: 200 });
	// 	} catch (error) {
	// 		// console.error('Error adding stock to watchlist:', error);
	// 		return NextResponse.json({msg: Utils.getErrMessage(error)}, { status: 404 });
	// 	}
	// }
	// else if( action == "remove" ) {
	// 	try {
	// 		const userData = await User.updateOne(
	// 			{ _id: userId, "watchlist.groupName": groupName },
	// 			{ $pull: { "watchlist.$.stocks": { symbol: stock.symbol } } },
	// 			{ new: true }
	// 		);
	// 		// console.log('Stock removed from watchlist successfully.');
	// 		return NextResponse.json(userData, { status: 200 });
	// 	} catch (error) {
	// 		// console.error('Error removing stock from watchlist:', error);
	// 		return NextResponse.json({msg: Utils.getErrMessage(error)}, { status: 404 });
	// 	}
	// }
	

	try {
        // Define update operations based on the action
        let updateOperation: any;
        if (action === 'add') {
            updateOperation = {
                $push: { "watchlist.$.stocks": stock }
            };
        } else if (action === 'remove') {
            updateOperation = {
                $pull: { "watchlist.$.stocks": { symbol: stock.symbol } }
            };
        } else {
            throw new Error('Invalid action specified.');
        }

        // Perform the update and get the updated user document
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, "watchlist.groupName": groupName },
            updateOperation,
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            throw new Error('User or watchlist group not found.');
        }

        // console.log('Watchlist updated successfully.');
        // return updatedUser; // Return the updated user document
		return NextResponse.json(updatedUser, { status: 200 });

    } catch (error) {
        // console.error('Error updating watchlist:', error);
        // throw error; // Re-throw error to handle it at the call site
		return NextResponse.json({msg: Utils.getErrMessage(error)}, { status: 404 });
    }

}

