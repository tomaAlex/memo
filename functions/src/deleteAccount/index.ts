import * as functions from "firebase-functions";
import { getAuthenticatedUserData } from "../utils";
import deleteStripeAccount from "./deleteStripeAccount";
import deleteMatches from "./deleteMatches";
import deleteUserReferences from "./deleteUserReferences";
import deleteSelf from "./deleteSelf";

export const deleteAccount = functions.https.onCall(async (data, context) => {
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const deletionActions = [deleteStripeAccount, deleteMatches, deleteUserReferences, deleteSelf];
	for (let i = 0; i < deletionActions.length; i++) {
		const executeDeleteAction = deletionActions[i];
		await executeDeleteAction(authenticatedIdentifiedUserData);
	}
});
