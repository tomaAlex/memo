export const assertUserHasMatch = (matchId: string, identifieduUserToOwnMatch: IdentifiedUser) => {
	const { matches } = identifieduUserToOwnMatch;
	const doesUserHaveMatch = matches.includes(matchId);
	if (!doesUserHaveMatch) {
		throw new Error(`User ${identifieduUserToOwnMatch.id} does not have match ${matchId}`);
	}
};
