import { messaging } from "firebase-admin";
import getReceivers from "./getReceivers";
import getReceiverTokens from "./getReceiverTokens";
import getSender from "./getSender";

const notifyReceivers = async (matchData: Match, senderId: string, message: string, matchId: string): Promise<void> => {
	const receivers = await getReceivers(matchData, senderId);
	const sender = await getSender(senderId);
	const { firstName, lastName } = sender;
	const senderName = `${firstName} ${lastName}`;

	await messaging().sendMulticast({
		tokens: getReceiverTokens(receivers),
		data: {
			matchId,
			type: "Message Notification",
		},
		notification: {
			title: senderName,
			body: message,
			imageUrl: sender.photos[0],
		},
		android: {
			notification: {
				sound: "default",
				notificationCount: 0,
			},
		},
		apns: {
			payload: {
				aps: {
					sound: "default",
					badge: 0,
				},
			},
		},
	});
};

export default notifyReceivers;
