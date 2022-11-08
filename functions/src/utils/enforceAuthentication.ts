import * as functions from "firebase-functions";

export const enforceAuthentication = (context: functions.https.CallableContext) => {
	if (!context.auth) {
		throw new functions.https.HttpsError("unauthenticated", "Endpoint requires authentication!");
	}
};
