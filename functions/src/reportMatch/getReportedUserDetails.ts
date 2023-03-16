import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import { assertUsersHaveMatch, getAuthenticatedUserData, getUserData } from "../utils";

const getReportedUserDetails = async (
	context: functions.https.CallableContext,
	reportedUserId: string,
	matchId: string
): Promise<
	[reportedUserReference: firestore.DocumentReference<User>, priorReports: Report[], reportingUserId: string]
> => {
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const reportedUserDocumentReference = firestore()
		.collection("users")
		.doc(reportedUserId) as firestore.DocumentReference<User>;
	const reportedUserData = await getUserData(reportedUserDocumentReference);
	const reportedIdentifiedUserData: IdentifiedUser = {
		...reportedUserData,
		id: reportedUserId,
	};
	assertUsersHaveMatch(matchId, authenticatedIdentifiedUserData, reportedIdentifiedUserData);
	return [reportedUserDocumentReference, reportedUserData.reports, authenticatedIdentifiedUserData.id];
};

export default getReportedUserDetails;
