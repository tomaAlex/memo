import { User } from "types";
import { useHasRecentlyUpdatedStatus, useSnapshot } from "hooks/useFirebaseUtilities";

export const useOnlineStatus = (userId: string): boolean => {
	const [userData] = useSnapshot<User>("users", userId);

	const isOnline = useHasRecentlyUpdatedStatus(userData ?? { updates: {} }, "lastAct", 60 * 1000);

	return isOnline;
};
