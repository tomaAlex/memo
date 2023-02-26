import { useCallback, useEffect, useState } from "react";
import { IdentifiedDataStructure } from "../useSnapshot/types";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { FirebaseCollectionIterator } from "../useCollectionSnapshot/types";
import determineWhetherCollectionExpanded from "./determineWhetherCollectionExpanded";

export const useCollectionIteratorAsArray = <
	DataStructure extends FirebaseFirestoreTypes.DocumentData = FirebaseFirestoreTypes.DocumentData
>({
	current,
	hasNext,
	next,
	reset,
}: FirebaseCollectionIterator<IdentifiedDataStructure<DataStructure>>): [
	cachedCollection: IdentifiedDataStructure<DataStructure>[],
	expandCachedCollection: () => void,
	resetCachedCollection: () => void
] => {
	const [collection, setCollection] = useState<IdentifiedDataStructure<DataStructure>[]>([]);
	const currentSnapshot = current();
	const canGoNext = hasNext();

	const extendCollection = useCallback(() => {
		if (!canGoNext) {
			return;
		}
		next();
	}, [canGoNext, next]);

	const resetCollection = useCallback(() => {
		setCollection([]);
		reset();
	}, [reset]);

	useEffect(() => {
		extendCollection();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (currentSnapshot === null) {
			return;
		}
		const possiblyNewElement = currentSnapshot[0];
		const hasCollectionExpanded = determineWhetherCollectionExpanded(collection, possiblyNewElement);
		if (!hasCollectionExpanded) {
			return;
		}
		setCollection((previousCollection) => [...previousCollection, { ...possiblyNewElement }]);
	}, [currentSnapshot, collection]);

	return [collection, extendCollection, resetCollection];
};
