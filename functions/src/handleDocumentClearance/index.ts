import * as functions from "firebase-functions";
import clearDocument from "./clearDocument";

export const handleDocumentClearance = functions.https.onRequest(async (req, res) => {
	const { documentToClearPath } = req.body as DocumentClearancePayload;
	try {
		await clearDocument(documentToClearPath);
		res.send(200);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});
