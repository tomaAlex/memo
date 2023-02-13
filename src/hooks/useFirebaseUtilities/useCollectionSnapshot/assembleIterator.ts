import { SetStateAction } from "react";
import { FirebaseCollectionIterator } from "./types";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import getCurrentElement from "./getCurrentElement";

const assembleIterator = <
	DataStructure extends FirebaseFirestoreTypes.DocumentData = FirebaseFirestoreTypes.DocumentData
>(
	hasPrevious: boolean,
	hasNext: boolean,
	hasFetchedCollectionIds: boolean,
	currentCollectionDocumentDynamicSnapshot: [
		DataStructure | null,
		FirebaseFirestoreTypes.DocumentReference<DataStructure>
	],
	setCurrentCollectionIdIndex: (previousCurrentCollectionIdIndex: SetStateAction<number>) => void
): FirebaseCollectionIterator<DataStructure> => {
	return {
		previous: () => {
			if (!hasPrevious) {
				return;
			}
			setCurrentCollectionIdIndex((previousCurrentCollectionIdIndex) => previousCurrentCollectionIdIndex - 1);
		},
		next: () => {
			if (!hasNext) {
				return;
			}
			setCurrentCollectionIdIndex((previousCurrentCollectionIdIndex) => previousCurrentCollectionIdIndex + 1);
		},
		current: () => getCurrentElement(hasFetchedCollectionIds, currentCollectionDocumentDynamicSnapshot),
		hasPrevious: () => hasPrevious,
		hasNext: () => hasNext,
	};
};

export default assembleIterator;
