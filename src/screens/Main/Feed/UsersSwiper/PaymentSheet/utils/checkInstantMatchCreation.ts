import fetchMatchPreviews from "hooks/useFirebaseUtilities/useMatchPreviewLoader/fetchMatchPreviews";

const checkInstantMatchCreation = async (userToHaveInstantlyMatchedId: string): Promise<boolean> => {
	console.log("checkInstantMatchCreation");
	const matchPreviews = await fetchMatchPreviews();
	console.log({ matchPreviews });
	for (const matchPreview of matchPreviews) {
		const matchedUserIds = matchPreview.matchedUsers.map((matchedIdentifiedUser) => matchedIdentifiedUser.id);
		if (matchedUserIds.includes(userToHaveInstantlyMatchedId)) {
			return true;
		}
	}
	return false;
};

export default checkInstantMatchCreation;
