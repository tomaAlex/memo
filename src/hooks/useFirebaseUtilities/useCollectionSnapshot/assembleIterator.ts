import { SetStateAction } from "react";
import getCurrentElement from "./getCurrentElement";
import { FirebaseCollectionIterator } from "./types";
import { IdentifiedDataStructure } from "../useSnapshot/types";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

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
): FirebaseCollectionIterator<IdentifiedDataStructure<DataStructure>> => {
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
		reset: () => {
			setCurrentCollectionIdIndex(0);
		},
	};
};

export default assembleIterator;
