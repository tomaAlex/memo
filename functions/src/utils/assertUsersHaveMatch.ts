import { assertUserHasMatch } from "./assertUserHasMatch";

export const assertUsersHaveMatch = (matchId: string, ...identifiedUsersToOwnMatch: IdentifiedUser[]) => {
	identifiedUsersToOwnMatch.forEach((identifiedUserToOwnMatch) => {
		assertUserHasMatch(matchId, identifiedUserToOwnMatch);
	});
};
