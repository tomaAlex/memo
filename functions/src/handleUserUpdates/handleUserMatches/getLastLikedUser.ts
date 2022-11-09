import { firestore } from "firebase-admin";

const getLastLikedUser = (userToGetLastLikeFrom: User) => {
	const { likes } = userToGetLastLikeFrom;
	const lastLikedUserId = likes[likes.length - 1];
	return firestore().collection("users").doc(lastLikedUserId) as firestore.DocumentReference<User>;
};

export default getLastLikedUser;
