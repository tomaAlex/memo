export const assertUserHasMatch = (matchId: string, identifiedUserToOwnMatch: IdentifiedUser) => {
	const { matches } = identifiedUserToOwnMatch;
	const doesUserHaveMatch = matches.includes(matchId);
	if (!doesUserHaveMatch) {
		throw new Error(`User ${identifiedUserToOwnMatch.id} does not have match ${matchId}`);
	}
};
