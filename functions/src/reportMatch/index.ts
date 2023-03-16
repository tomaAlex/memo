import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import getMatchHistory from "./getMatchHistory";
import getReportedUserDetails from "./getReportedUserDetails";

export const reportMatch = functions.https.onCall(async (data, context) => {
	const matchId = data.matchId as string;
	const userId = data.userId as string;
	const reasons = data.reasons as ReportReason[];

	const [reportedUserReference, priorReports, reportingUserId] = await getReportedUserDetails(context, userId, matchId);

	const matchHistory = await getMatchHistory(matchId);

	await reportedUserReference.update({
		reports: [
			...priorReports,
			{ user: reportingUserId, history: matchHistory, reasons, timestamp: firestore.Timestamp.now() },
		],
	});
});
