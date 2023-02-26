import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useCollectionIteratorAsArray } from "../useCollectionIteratorAsArray";
import { useCollectionSnapshot } from "../useCollectionSnapshot";

export const useCollectionSnapshotArray = <
	DataStructure extends FirebaseFirestoreTypes.DocumentData = FirebaseFirestoreTypes.DocumentData
>(
	collectionId: string
) => {
	const collectionIterator = useCollectionSnapshot<DataStructure>(collectionId);
	const cachedIteratingArray = useCollectionIteratorAsArray<DataStructure>(collectionIterator);

	return cachedIteratingArray;
};
