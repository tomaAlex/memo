import { firestore } from "firebase-admin";
import { CloudTasksClient } from "@google-cloud/tasks";
import getMatchDeletionTask from "./getMatchDeletionTask";

const scheduleMatchDeletion = async (
	matchToBeScheduledForDeletionReference: firestore.DocumentReference<Match>
): Promise<void> => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const project = JSON.parse(process.env.FIREBASE_CONFIG!).projectId;
	const callbackLocation = "us-central1";
	const queueLocation = "europe-west1";
	const queue = "firestore-ttl";
	const tasksClient = new CloudTasksClient();
	const queuePath = tasksClient.queuePath(project, queueLocation, queue);
	const handleMatchClearanceURL = `https://${callbackLocation}-${project}.cloudfunctions.net/handleMatchClearance`;
	const matchDeletionTask = await getMatchDeletionTask(handleMatchClearanceURL, matchToBeScheduledForDeletionReference);
	await tasksClient.createTask({ parent: queuePath, task: matchDeletionTask });
};

export default scheduleMatchDeletion;
