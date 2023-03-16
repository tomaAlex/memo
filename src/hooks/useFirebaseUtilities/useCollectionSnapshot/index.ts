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
	const allowedCollectionIds = collectionIds.filter(
		(possiblyAllowedCollectionId) => !excludedDocumentIds.includes(possiblyAllowedCollectionId)
	);
	const [currentCollectionIdIndex, setCurrentCollectionIdIndex] = useState<number>(-1);
	const hasFetchedCollectionIds = allowedCollectionIds.length > 0;
	const hasPrevious = hasFetchedCollectionIds && currentCollectionIdIndex > 0;
	const hasNext = hasFetchedCollectionIds && currentCollectionIdIndex < allowedCollectionIds.length - 1;
	const currentCollectionDocumentId = hasFetchedCollectionIds
		? allowedCollectionIds[currentCollectionIdIndex]
		: undefined;
	const currentCollectionDocumentDynamicSnapshot = useSnapshot<DataStructure>(
		collectionId,
		currentCollectionDocumentId
	);

	useEffect(() => {
		console.log("useCollectionSnapshot useEffect");
		fetchCollectionIds(collectionId).then((fetchedCollectionIds) => {
			setCollectionIds(fetchedCollectionIds);
			setCurrentCollectionIdIndex(0);
		});
	}, [collectionId]);

	return assembleIterator(
		hasPrevious,
		hasNext,
		hasFetchedCollectionIds,
		currentCollectionDocumentDynamicSnapshot,
		setCurrentCollectionIdIndex
	);
};
