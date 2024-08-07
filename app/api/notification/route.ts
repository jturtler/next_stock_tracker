
import { mongoose } from "@/lib/db"; // Have to have this import so that we can connect database
import { JSONObject } from "@/lib/definations";
import Notification from "@/lib/schemas/NotificationSchema";
import User from '@/lib/schemas/User.schema';
import * as Utils from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	
	const userId = searchParams.get("userId");
	const notification = await Notification.findOne({ userId });

	return NextResponse.json(notification, { status: 200 });
}

export async function POST(request: NextRequest) {
	try {
		const { userId, notification } = await request.json();

		const addNotification  = await Notification.findOneAndUpdate(
			{ userId },
			{
                $push: { notifications: notification },
            },
            { new: true, upsert: true } // Create a new notification if not found
		);

		if (!addNotification ) {
            throw new Error('Notification not found');
        }

		return NextResponse.json(addNotification, { status: 200 }); // Return the updated user document
		
	} catch (error) {
		return NextResponse.json({ msg: Utils.getErrMessage(error) }, { status: 404 });
	}
}


export async function PUT(request: NextRequest) {
	try {
		const { userId, notification } = await request.json();
		const symbol = notification.symbol;
		const notificationResponse = await Notification.findOneAndUpdate(
			{ userId, 'notifications.symbol': symbol },
			{
                $set: {
                    'notifications.$': {
                        ...notification,
                        symbol,
                    },
                },
            },
            { new: true }
		);
		return NextResponse.json(notificationResponse, { status: 200 }); // Return the updated user document
		
	} catch (error) {
		return NextResponse.json({ msg: Utils.getErrMessage(error) }, { status: 404 });
	}
}


export async function DELETE(request: NextRequest) {
	try {
		const { userId, symbol } = await request.json();

		const updatednotification  = await Notification.findOneAndUpdate(
			{ userId, 'notifications.symbol': symbol },
			{
                $pull: { notifications: { symbol } },
            },
            { new: true }
		);
		
        if (!updatednotification) {
            throw new Error('notifications not found');
        }

		return NextResponse.json(updatednotification , { status: 200 }); // Return the updated user document
		
	} catch (error) {
		return NextResponse.json({ msg: Utils.getErrMessage(error) }, { status: 404 });
	}
}
