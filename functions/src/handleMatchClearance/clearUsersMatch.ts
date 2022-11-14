import clearUserMatch from "./clearUserMatch";

const clearUsersMatch = async (userToHaveMatchClearedIds: string[], matchToClearId: string): Promise<void> => {
	const pendingUserMatchClearancePromises = userToHaveMatchClearedIds.map((userToHaveMatchClearedId) =>
		clearUserMatch(userToHaveMatchClearedId, matchToClearId)
	);
	await Promise.all(pendingUserMatchClearancePromises);
};

export default clearUsersMatch;
