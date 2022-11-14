import { firestore } from "firebase-admin";
import { CloudTasksClient } from "@google-cloud/tasks";
import getMatchExpirationDateInSeconds from "./getMatchExpirationDateInSeconds";

const getMatchDeletionTask = async (
	handleMatchClearanceURL: string,
	matchToBeScheduledForDeletionReference: firestore.DocumentReference<Match>
): Promise<Parameters<CloudTasksClient["createTask"]>["0"]["task"]> => {
	const documentToClearPath = matchToBeScheduledForDeletionReference.path;
	const documentClearancePayload: DocumentClearancePayload = { documentToClearPath };
	const matchExpirationDateInSeconds = await getMatchExpirationDateInSeconds(matchToBeScheduledForDeletionReference);
	return {
		httpRequest: {
			httpMethod: "POST",
			url: handleMatchClearanceURL,
			body: Buffer.from(JSON.stringify(documentClearancePayload)).toString("base64"),
			headers: {
				"Content-Type": "application/json",
			},
		},
		scheduleTime: {
			seconds: matchExpirationDateInSeconds,
		},
	};
};

export default getMatchDeletionTask;
