import { useEffect, useRef, useState } from "react";
import { UpdateManagedDocument } from "types";

/**
 * Returns whether or not the document has been updated within the given time window.
 * @param updateManagedDocument The document to check for recent updates.
 * @param updateId The id of the update to check for.
 * @param updateTimeWindow The time window to check for updates in (in milliseconds) - defaults to 3000.
 */
export const useHasRecentlyUpdatedStatus = (
	updateManagedDocument: UpdateManagedDocument,
	updateId: string,
	updateTimeWindow: number = 3000
): boolean => {
	const [hasRecentlyUpdated, setHasRecentlyUpdated] = useState(false);
	const updateChecker = useRef<NodeJS.Timer | null>(null);

	const clearUpdateChecker = () => {
		if (!updateChecker.current) {
			return;
		}
		clearInterval(updateChecker.current);
	};

	useEffect(() => {
		clearUpdateChecker();
		updateChecker.current = setInterval(() => {
			const update = updateManagedDocument.updates[updateId];
			if (!update) {
				setHasRecentlyUpdated(false);
				return;
			}
			const updateTimestamp = update.toMillis();
			const now = Date.now();
			const elapsedSinceUpdate = now - updateTimestamp;
			const recalculatedRecentlyUpdatedState = elapsedSinceUpdate <= updateTimeWindow;
			if (recalculatedRecentlyUpdatedState === hasRecentlyUpdated) {
				return;
			}
			setHasRecentlyUpdated(elapsedSinceUpdate <= updateTimeWindow);
		}, 500);
	}, [hasRecentlyUpdated, updateId, updateManagedDocument.updates, updateTimeWindow]);

	useEffect(() => {
		return () => {
			clearUpdateChecker();
		};
	}, []);

	return hasRecentlyUpdated;
};
