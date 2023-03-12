import { firestore } from "firebase-admin";

const deleteSelf = async (userToDelete: IdentifiedUser): Promise<void> => {
	const userToDeleteDocumentReference = firestore()
		.collection("users")
		.doc(userToDelete.id) as firestore.DocumentReference<IdentifiedUser>;
	await userToDeleteDocumentReference.delete();
};

export default deleteSelf;
