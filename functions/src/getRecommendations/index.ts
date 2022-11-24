import * as functions from "firebase-functions";
import { getAuthenticatedUserData } from "../utils";
import filterRecommendableUsers from "./filterRecommendableUsers";
import getAllPossiblyRecommendableUsers from "./getAllPossiblyRecommendableUsers";

export const getRecommendations = functions.https.onCall(async (data, context) => {
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const allRecommendableUsers = await getAllPossiblyRecommendableUsers(authenticatedIdentifiedUserData);
	return filterRecommendableUsers(authenticatedIdentifiedUserData, allRecommendableUsers);
});
