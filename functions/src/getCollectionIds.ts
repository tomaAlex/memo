import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import { enforceAuthentication } from "./utils";

export const getCollectionIds = functions.https.onCall(async (data, context) => {
	enforceAuthentication(context);
	const collectionId: string = data.collectionId;
	const collectionReference = firestore().collection(collectionId);
	const collectionDocuments = await collectionReference.listDocuments();
	const collectionDocumentIds = collectionDocuments.map((document) => document.id);
	return collectionDocumentIds;
});
