import clearMatch from "./clearMatch";
import * as functions from "firebase-functions";

export const handleMatchClearance = functions.https.onRequest(async (req, res) => {
	const { documentToClearPath } = req.body as DocumentClearancePayload;
	try {
		await clearMatch(documentToClearPath);
		res.send(200);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});
