import { useCallback, useEffect, useRef, useState } from "react";
import { IdentifiedUser } from "types/index";
import useUserFilter from "../useUserFilter";
import { useCollectionSnapshotArray } from "../useFirebaseUtilities";

export const useExpandableRecommendations = (): [
	filteredRecommendations: IdentifiedUser[],
	expandFilteredRecommendations: () => void,
	resetFilteredRecommendations: () => void
] => {
	const filterUser = useUserFilter();
	const [unfilteredRecommendations, expandUnfilteredRecommendations, resetUnfilteredRecommendations] =
		useCollectionSnapshotArray<IdentifiedUser>("users", "whitelist");
	const [filteredRecommendations, setFilteredRecommendations] = useState<IdentifiedUser[]>([]);
	const mustExpand = useRef<boolean>(true);
	const lastUnfilteredRecommendationIndex = unfilteredRecommendations.length - 1;
	const lastUnfilteredRecommendation =
		lastUnfilteredRecommendationIndex < 0 ? null : unfilteredRecommendations[lastUnfilteredRecommendationIndex];

	const expandFilteredRecommendations = useCallback(() => {
		mustExpand.current = true;
		expandUnfilteredRecommendations();
	}, [expandUnfilteredRecommendations]);

	const resetFilteredRecommendations = useCallback(() => {
		setFilteredRecommendations([]);
		resetUnfilteredRecommendations();
		expandFilteredRecommendations();
	}, [resetUnfilteredRecommendations, expandFilteredRecommendations]);

	useEffect(() => {
		if (!mustExpand.current || !lastUnfilteredRecommendation) {
			return;
		}
		const didFilteredRecommendationsExpand = filterUser(lastUnfilteredRecommendation);
		if (didFilteredRecommendationsExpand) {
			setFilteredRecommendations((previousFilteredRecommendations) => [
				...previousFilteredRecommendations,
				lastUnfilteredRecommendation,
			]);
			mustExpand.current = false;
			return;
		}
		expandUnfilteredRecommendations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastUnfilteredRecommendation]);

	return [filteredRecommendations, expandFilteredRecommendations, resetFilteredRecommendations];
};
