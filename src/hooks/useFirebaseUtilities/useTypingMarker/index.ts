import { useSelector } from "react-redux";
import { selectId } from "redux/selectors";
import { useSnapshot } from "../useSnapshot";
import { firebase } from "@react-native-firebase/firestore";

export const useTypingMarker = (matchId: string) => {
	const selfId = useSelector(selectId);
	const [matchData, matchReference] = useSnapshot<Match>("matches", matchId);

	return () => {
		if (!matchReference || !matchData) {
			return;
		}
		const { updates: currentUpdates } = matchData;
		matchReference.update({
			updates: {
				...currentUpdates,
				[selfId]: firebase.firestore.Timestamp.now(),
			},
		});
	};
};
