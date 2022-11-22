import { useCallback, useEffect, useState } from "react";
import { ReduxProps } from "types/index";
import fetchMatchPreviews from "./fetchMatchPreviews";

export const useMatchPreviewLoader = (
	userToLoadMatchPreviewsFor: ReduxProps["user"],
	updateAllMatchPreviews: ReduxProps["updateAllMatchPreviews"]
) => {
	const [areMatchPreviewsLoading, setAreMatchPreviewsLoading] = useState(true);
	const matchIds = userToLoadMatchPreviewsFor.matches;

	const loadMatchPreviews = useCallback(async () => {
		const userMatchPreviews = await fetchMatchPreviews();
		updateAllMatchPreviews(userMatchPreviews);
		setAreMatchPreviewsLoading(false);
	}, [updateAllMatchPreviews]);

	useEffect(() => {
		loadMatchPreviews();
	}, [matchIds, loadMatchPreviews]);

    return areMatchPreviewsLoading;
};
