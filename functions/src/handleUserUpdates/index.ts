import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import handleUserMatches from "./handleUserMatches";

export const handleUserUpdates = functions.firestore.document("users/{userId}").onUpdate(async (change, context) => {
	const changedUserId = context.params.userId as string;
	const changedUser = firestore().collection("users").doc(changedUserId) as firestore.DocumentReference<User>;
	const beforeChangeUserData = change.before.data() as User;
	const afterChangeUserData = change.after.data() as User;
	await handleUserMatches(changedUser, beforeChangeUserData, afterChangeUserData);
});
