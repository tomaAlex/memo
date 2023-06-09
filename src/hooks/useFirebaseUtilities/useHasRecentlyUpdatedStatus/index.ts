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
	const update = updateManagedDocument.updates[updateId];
	if (!update) {
		return false;
	}
	const updateTimestamp = update.toMillis();
	const now = Date.now();
	const elapsedSinceUpdate = now - updateTimestamp;
	return elapsedSinceUpdate <= updateTimeWindow;
};
