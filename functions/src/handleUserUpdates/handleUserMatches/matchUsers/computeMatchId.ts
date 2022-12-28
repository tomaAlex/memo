const computeMatchId = (...userIdsToBeMatched: string[]): string => {
	const sortedUserIdsToBeMatched = [...userIdsToBeMatched].sort();
	return sortedUserIdsToBeMatched.join("_");
};

export default computeMatchId;
