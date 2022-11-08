import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import { getAuthenticatedUserData } from "./utils";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const getRecommendations = functions.https.onCall(async (data, context) => {
	const [authenticatedUserData, authenticatedUserUid] = await getAuthenticatedUserData(context);
	const currentUserDislikes = authenticatedUserData.dislikes as string[];
	const currentUserLikes = authenticatedUserData.likes as string[];
	const excludedUsersFromRecommendations = [...currentUserDislikes, ...currentUserLikes, authenticatedUserUid];
	const allUsers = await firestore().collection("users").get();
	const allRecommendableUsers = allUsers.docs.filter((user) => !excludedUsersFromRecommendations.includes(user.id));
	return allRecommendableUsers.map((user) => {
		return { ...user.data(), id: user.id };
	});
});
