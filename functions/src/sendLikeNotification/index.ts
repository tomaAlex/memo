import { messaging } from "firebase-admin";
import * as functions from "firebase-functions";
import getReceiver from "./getReceiver";
import getReceiverToken from "./getReceiverToken";

export const sendLikeNotification = functions.https.onCall(async (data, context) => {
	const receiverId = data as string;
	const receiver = await getReceiver(receiverId);
	const receiverToken = getReceiverToken(receiver);

	// Notification

	await messaging().sendMulticast({
		tokens: receiverToken,
		notification: {
			title: "New Like",
			body: "You have been liked by somebody.",
		},
	});
});
