import { firestore } from "firebase-admin";

const getSender = async (senderId: string): Promise<User> => {
	const senderDocumentReference = firestore().collection("users").doc(senderId);
	const senderDocument = await senderDocumentReference.get();
	return senderDocument.data() as User;
};

export default getSender;
