import { DynamicFirebaseSnapshot } from "./types";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { IdentifiedDataStructure } from "../useSnapshot/types";

const getCurrentElement = <
	DataStructure extends FirebaseFirestoreTypes.DocumentData = FirebaseFirestoreTypes.DocumentData
>(
	hasFetchedCollectionIds: boolean,
	currentCollectionDocumentDynamicSnapshot: [
		DataStructure | null,
		FirebaseFirestoreTypes.DocumentReference<DataStructure>
	]
): DynamicFirebaseSnapshot<IdentifiedDataStructure<DataStructure>> | null => {
	const hasSnapshot = hasFetchedCollectionIds && currentCollectionDocumentDynamicSnapshot[0] !== null;
	return hasSnapshot
		? (currentCollectionDocumentDynamicSnapshot as DynamicFirebaseSnapshot<IdentifiedDataStructure<DataStructure>>)
		: null;
};

export default getCurrentElement;
