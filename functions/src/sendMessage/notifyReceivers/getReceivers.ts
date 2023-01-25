import { firestore } from "firebase-admin";

const getReceivers = (matchData: Match, senderId: string): Promise<User[]> => {
	const receiverIds = matchData.matchedUsers.filter((matchedUserId) => matchedUserId !== senderId);
	const receiverDocumentReferences = receiverIds.map(
		(receiverId) => firestore().collection("users").doc(receiverId) as firestore.DocumentReference<User>
	);
	const receiverLoaders = receiverDocumentReferences.map((receiverDocumentReference) =>
		receiverDocumentReference.get().then((receiverDocument) => receiverDocument.data() as User)
	);
	return Promise.all(receiverLoaders);
};

export default getReceivers;
