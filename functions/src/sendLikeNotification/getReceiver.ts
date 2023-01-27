import { firestore } from "firebase-admin";

const getReceiver = (receiverId: string): Promise<User> => {
	const receiverDocumentReference = firestore()
		.collection("users")
		.doc(receiverId) as firestore.DocumentReference<User>;
	const receiverLoader = receiverDocumentReference.get().then((receiverDocument) => receiverDocument.data() as User);
	return Promise.resolve(receiverLoader);
};

export default getReceiver;
