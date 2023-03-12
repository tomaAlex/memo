import { firestore } from "firebase-admin";

const deleteUserReference = async (
	userToHaveReferencesRemovedFromDocumentReference: firestore.DocumentReference<IdentifiedUser>,
	userReferencesToRemove: IdentifiedUser
): Promise<void> => {
	const { id: userReferencesToRemoveId } = userReferencesToRemove;
	if (userToHaveReferencesRemovedFromDocumentReference.id === userReferencesToRemoveId) {
		return;
	}
	const userToHaveReferencesRemovedFromSnapshot = await userToHaveReferencesRemovedFromDocumentReference.get();
	const userToHaveReferencesRemovedFromData = userToHaveReferencesRemovedFromSnapshot.data();
	if (!userToHaveReferencesRemovedFromData) {
		return;
	}
	const { likes: likesToClear, dislikes: dislikesToClear } = userToHaveReferencesRemovedFromData;
	userToHaveReferencesRemovedFromDocumentReference.update({
		likes: likesToClear.filter((likedUserId) => likedUserId !== userReferencesToRemoveId),
		dislikes: dislikesToClear.filter((dislikedUserId) => dislikedUserId !== userReferencesToRemoveId),
	});
};

export default deleteUserReference;
