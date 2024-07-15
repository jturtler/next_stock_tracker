
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
	const username = searchParams.get("username");
	const password = searchParams.get("password");
	const searchResult = await User.find(({username}));

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

	return NextResponse.json(newUser, { status: 200 })
}

