import { firestore } from "firebase-admin";

const clearDocument = async (documentToClearPath: string): Promise<void> => {
	const documentToClearReference = firestore().doc(documentToClearPath);
	await documentToClearReference.delete();
};

export default clearDocument;
