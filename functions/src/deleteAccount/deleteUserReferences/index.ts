import { firestore } from "firebase-admin";
import deleteUserReference from "./deleteUserReference";

/**
 * Removes references to a user from other users' data asynchronously/ simultaneously.
 * @param {IdentifiedUser} userReferencesToRemove The user whose references will be removed from other users' data.
 */
const deleteUserReferences = async (userReferencesToRemove: IdentifiedUser): Promise<void> => {
	const usersCollectionReference = firestore().collection("users") as firestore.CollectionReference<IdentifiedUser>;
	const userDocumentReferences = (await usersCollectionReference.listDocuments()).filter(
		(userDocumentReference) => userDocumentReference.id !== "whitelist"
	);
	const userClearancePromises = userDocumentReferences.map((userToHaveReferencesRemovedFromDocumentReference) => {
		return deleteUserReference(userToHaveReferencesRemovedFromDocumentReference, userReferencesToRemove);
	});
	await Promise.all(userClearancePromises);
};

export default deleteUserReferences;
