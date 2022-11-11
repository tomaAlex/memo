import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import handleUserMatches from "./handleUserMatches";

export const handleUserUpdates = functions.firestore.document("users/{userId}").onUpdate(async (change, context) => {
	console.log("handleUserUpdates triggered!");
	const changedUserId = context.params.userId as string;
	console.log("changedUserId: ", changedUserId);
	const changedUser = firestore().collection("users").doc(changedUserId) as firestore.DocumentReference<User>;
	console.log("changedUser: ", changedUser.id);
	const beforeChangeUserData = change.before.data() as User;
	console.log("beforeChangeUserData: ", JSON.stringify(beforeChangeUserData));
	const afterChangeUserData = change.after.data() as User;
	console.log("afterChangeUserData: ", JSON.stringify(afterChangeUserData));
	await handleUserMatches(changedUser, beforeChangeUserData, afterChangeUserData);
});
