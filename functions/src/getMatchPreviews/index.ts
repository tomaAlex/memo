import * as functions from "firebase-functions";
import { getAuthenticatedUserData } from "../utils";
import getMatchPreview from "./getMatchPreview";

export const getMatchPreviews = functions.https.onCall(async (data, context) => {
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const matchIds = authenticatedIdentifiedUserData.matches;
	const matchPreviewPromises = matchIds.map((matchId) => getMatchPreview(matchId, authenticatedIdentifiedUserData));
	return Promise.all(matchPreviewPromises);
});
