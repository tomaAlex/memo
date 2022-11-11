import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import { getAuthenticatedUserData } from "./utils";

export const getRecommendations = functions.https.onCall(async (data, context) => {
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const currentUserDislikes = authenticatedIdentifiedUserData.dislikes;
	const currentUserLikes = authenticatedIdentifiedUserData.likes;
	const excludedUsersFromRecommendations = [
		...currentUserDislikes,
		...currentUserLikes,
		authenticatedIdentifiedUserData.id,
	];
	const allUsers = (await firestore().collection("users").get()) as firestore.QuerySnapshot<User>;
	const allRecommendableUsers = allUsers.docs.filter((user) => !excludedUsersFromRecommendations.includes(user.id));
	return allRecommendableUsers.map((user) => {
		return { ...user.data(), id: user.id };
	});
});
