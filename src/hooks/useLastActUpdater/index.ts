import { User } from "types";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectId } from "redux/selectors";
import { useSnapshot } from "hooks/useFirebaseUtilities";
import { firebase } from "@react-native-firebase/firestore";

/**
 * This hook is used to update the last act of the user.
 * @param actUpdatingWindow The time window in which the last act will be updated.
 */
export const useLastActUpdater = (actUpdatingWindow: number): void => {
	const selfId = useSelector(selectId);
	const [selfData, selfReference] = useSnapshot<User>("users", selfId);
	const lastActUpdater = useRef<NodeJS.Timer | null>(null);

	const clearLastActUpdater = () => {
		if (!lastActUpdater.current) {
			return;
		}
		clearInterval(lastActUpdater.current);
		lastActUpdater.current = null;
	};

	useEffect(() => {
		clearLastActUpdater();
		lastActUpdater.current = setInterval(() => {
			if (!selfData || !selfReference) {
				return;
			}
			const { updates: currentSelfUpdates } = selfData;
			selfReference.update({
				updates: {
					...currentSelfUpdates,
					lastAct: firebase.firestore.Timestamp.now(),
				},
			});
		}, actUpdatingWindow);
	}, [actUpdatingWindow, selfData, selfReference]);

	useEffect(() => {
		return () => {
			return clearLastActUpdater();
		};
	}, []);
};
