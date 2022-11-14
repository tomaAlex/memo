import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";

export const handleDocumentClearance = functions.https.onRequest(async (req, res) => {
	const { documentToClearPath } = req.body as DocumentClearancePayload;
	const documentToClearReference = firestore().doc(documentToClearPath);
	try {
		await documentToClearReference.delete();
		res.send(200);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});
