import { useHasRecentlyUpdatedStatus } from "../useHasRecentlyUpdatedStatus";
import { useSnapshot } from "../useSnapshot";

export const useIsTypingStatus = (matchId: string, possiblyTypingUserId: string): boolean => {
	const [matchData] = useSnapshot<Match>("matches", matchId);
	const hasRecentlyUpdatedTypingStatus = useHasRecentlyUpdatedStatus(
		matchData ?? { updates: {} },
		possiblyTypingUserId
	);
	return hasRecentlyUpdatedTypingStatus;
};
