import store from "redux/store";
import { useSnapshot } from "../useSnapshot";
import countMatchNotifications from "./countMatchNotifications";

export const useMatchNotifications = (matchId: string): number => {
	const { id: userId } = store.getState().user;
	const [matchData] = useSnapshot<Match>("matches", matchId);
	if (matchData === null) {
		return 0;
	}
	return countMatchNotifications(matchData, userId);
};
