import { mongoose } from "@/lib/db";


const NotificationSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	hasNewNotification: { default: false, type: Boolean, required: true },
	notifications: [
		{
			symbol: { type: String, required: true },
			threshold: { type: Number, required: true }, // The price at which to trigger the alert
			direction: { type: String, required: true }, // Whether the alert is for when the price goes above or below the threshold
		},
		{
			timestamps: true,
		}
	],
});

const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

export default Notification;
