import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import { enforceAuthentication } from "./enforceAuthentication";

export const getAuthenticatedUser = (context: functions.https.CallableContext) => {
	enforceAuthentication(context);
	const { uid } = context.auth as NonNullable<typeof context.auth>;
	return firestore().collection("users").doc(uid);
};
