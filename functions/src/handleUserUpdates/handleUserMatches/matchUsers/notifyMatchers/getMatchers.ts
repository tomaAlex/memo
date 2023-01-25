import { firestore } from "firebase-admin";

const getMatchers = (matchedUserIds: string[]): Promise<User[]> => {
	const matcherDocumentReferences = matchedUserIds.map(
		(matcherId) => firestore().collection("users").doc(matcherId) as firestore.DocumentReference<User>
	);
	const matcherLoaders = matcherDocumentReferences.map((matcherDocumentReference) =>
		matcherDocumentReference.get().then((matcherDocument) => matcherDocument.data() as User)
	);
	return Promise.all(matcherLoaders);
};

export default getMatchers;
