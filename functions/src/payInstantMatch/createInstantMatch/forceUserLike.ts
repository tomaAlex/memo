import { firestore } from "firebase-admin";
import { getUserData } from "../../utils";

const forceUserLike = async (userToHaveLikeForcedId: string, likeToForceId: string): Promise<void> => {
	const userToHaveLikeForcedDocumentReference = firestore()
		.collection("users")
		.doc(userToHaveLikeForcedId) as firestore.DocumentReference<User>;
	const { likes } = await getUserData(userToHaveLikeForcedDocumentReference);
	const wasLikeAlreadyEnforced = likes.includes(likeToForceId);
	if (wasLikeAlreadyEnforced) {
		return;
	}
	await userToHaveLikeForcedDocumentReference.update({ likes: [...likes, likeToForceId] });
};

export default forceUserLike;
