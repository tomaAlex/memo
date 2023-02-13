import { DynamicFirebaseSnapshot } from "./types";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

const getCurrentElement = <
	DataStructure extends FirebaseFirestoreTypes.DocumentData = FirebaseFirestoreTypes.DocumentData
>(
	hasFetchedCollectionIds: boolean,
	currentCollectionDocumentDynamicSnapshot: [
		DataStructure | null,
		FirebaseFirestoreTypes.DocumentReference<DataStructure>
	]
): DynamicFirebaseSnapshot<DataStructure> | null => {
	const hasSnapshot = hasFetchedCollectionIds && currentCollectionDocumentDynamicSnapshot[0] !== null;
	return hasSnapshot
		? (currentCollectionDocumentDynamicSnapshot as DynamicFirebaseSnapshot<DataStructure> | null)
		: null;
};

export default getCurrentElement;
