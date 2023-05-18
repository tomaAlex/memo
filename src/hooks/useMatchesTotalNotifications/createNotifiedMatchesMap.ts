const createNotifiedMatchesMap = (matchIds: string[]): NotifiedMatches => {
	return matchIds.reduce((notifiedMatchesMap, matchId) => {
		notifiedMatchesMap[matchId] = 0;
		return notifiedMatchesMap;
	}, {} as NotifiedMatches);
};

export default createNotifiedMatchesMap;
