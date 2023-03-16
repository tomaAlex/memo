import { useEffect, useState } from "react";
import { useSnapshot } from "../useSnapshot";
import assembleIterator from "./assembleIterator";
import fetchCollectionIds from "./fetchCollectionIds";
import { FirebaseCollectionIterator } from "./types";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { IdentifiedDataStructure } from "../useSnapshot/types";

export const useCollectionSnapshot = <
	DataStructure extends FirebaseFirestoreTypes.DocumentData = FirebaseFirestoreTypes.DocumentData
>(
	collectionId: string,
	...excludedDocumentIds: string[]
): FirebaseCollectionIterator<IdentifiedDataStructure<DataStructure>> => {
	const [collectionIds, setCollectionIds] = useState<string[]>([]);
	const [currentCollectionIdIndex, setCurrentCollectionIdIndex] = useState<number>(-1);
	const hasFetchedCollectionIds = collectionIds.length > 0;
	const hasPrevious = hasFetchedCollectionIds && currentCollectionIdIndex > 0;
	const hasNext = hasFetchedCollectionIds && currentCollectionIdIndex < collectionIds.length - 1;
	const currentCollectionDocumentId = hasFetchedCollectionIds ? collectionIds[currentCollectionIdIndex] : undefined;
	const currentCollectionDocumentDynamicSnapshot = useSnapshot<DataStructure>(
		collectionId,
		currentCollectionDocumentId
	);

	useEffect(() => {
		fetchCollectionIds(collectionId).then((fetchedCollectionIds) => {
			const allowedDocumentIds = fetchedCollectionIds.filter(
				(fetchedCollectionId) => !excludedDocumentIds.includes(fetchedCollectionId)
			);
			setCollectionIds(allowedDocumentIds);
			setCurrentCollectionIdIndex(0);
		});
	}, [collectionId, excludedDocumentIds]);

	return assembleIterator(
		hasPrevious,
		hasNext,
		hasFetchedCollectionIds,
		currentCollectionDocumentDynamicSnapshot,
		setCurrentCollectionIdIndex
	);
};
