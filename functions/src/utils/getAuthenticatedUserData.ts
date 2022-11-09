import * as functions from "firebase-functions";
import { getAuthenticatedUser } from "./getAuthenticatedUser";
import { getUserData } from "./getUserData";

export const getAuthenticatedUserData = async (context: functions.https.CallableContext): Promise<[User, string]> => {
	const authenticatedUser = getAuthenticatedUser(context);
	const authenticatedUserData = await getUserData(authenticatedUser);
	return [authenticatedUserData, authenticatedUser.id];
};
