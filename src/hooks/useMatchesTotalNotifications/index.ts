import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { Match } from "types";
import createNotifiedMatchesMap from "./createNotifiedMatchesMap";
import countMatchNotifications from "hooks/useFirebaseUtilities/useMatchNotifications/countMatchNotifications";

export const useMatchesTotalNotifications = (matchIds: string[], requestingUserId: string): number => {
	const allMatchesCollectionReference = firestore().collection(
		"matches"
	) as FirebaseFirestoreTypes.CollectionReference<Match>;
	const [notifiedMatches, setNotifiedMatches] = useState(createNotifiedMatchesMap(matchIds));
	const notifiedMatchSnapshotCleaners = [] as Function[];

	for (const matchId of matchIds) {
		const matchDocumentReference = allMatchesCollectionReference.doc(matchId);
		const matchSnapshotCleaner = matchDocumentReference.onSnapshot((matchSnapshot) => {
			const matchData = matchSnapshot.data() as Match;
			const matchUnreadMessages = countMatchNotifications(matchData, requestingUserId);
			const matchUnreadMessagesChanged = notifiedMatches[matchId] !== matchUnreadMessages;
			if (!matchUnreadMessagesChanged) {
				return;
			}
			setNotifiedMatches((previouslyNotifiedMatches) => {
				return {
					...previouslyNotifiedMatches,
					[matchId]: matchUnreadMessages,
				};
			});
		});
		notifiedMatchSnapshotCleaners.push(matchSnapshotCleaner);
	}

	const cleanNotifiedMatchSnapshots = () => {
		notifiedMatchSnapshotCleaners.forEach((notifiedMatchSnapshotCleaner) => {
			notifiedMatchSnapshotCleaner();
		});
		notifiedMatchSnapshotCleaners.length = 0;
	};

	useEffect(() => {
		cleanNotifiedMatchSnapshots();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchIds, requestingUserId]);

	useEffect(() => {
		return () => {
			cleanNotifiedMatchSnapshots();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return Object.values(notifiedMatches).reduce((totalNotifications, matchUnreadMessages) => {
		return totalNotifications + matchUnreadMessages;
	}, 0);
};
