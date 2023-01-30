import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import connector from "../../redux/connector";
import auth from "@react-native-firebase/auth";
import { MainScreenNames, ScreenNames, ScreenProps } from "types/index";
import { getTimestampFromJSON } from "Firebase";
import handleUserChange from "./utils/handleUserChange";
import handleLocationCollection from "./utils/handleLocationCollection";
import firebase from "@react-native-firebase/app";
import FirebaseAppCheck from "@react-native-firebase/app-check";
import messaging from "@react-native-firebase/messaging";
import Loading from "components/Loading";
import styles from "./Observer.module.scss";
import { MatchPreview } from "types/index";

/**
 * A fake screen that is used to watch around for global updates.
 */
const Observer = ({
	navigation,
	updateUser,
	setAwaitingLoginStatus,
	matchPreviews,
}: ScreenProps<ScreenNames.Observer>) => {
	// @ts-ignore, as NodeJS.Timeout is not recognized by TS in this case
	const currentLocationCollectionRoutineReference = useRef<NodeJS.Timeout | null>(null);

	const setObserving = React.useCallback(() => {
		auth().onAuthStateChanged((user) => {
			handleUserChange(user, updateUser, setAwaitingLoginStatus, navigation);
			handleLocationCollection(currentLocationCollectionRoutineReference, user?.uid);
		});

		// open notification from background state
		messaging().onNotificationOpenedApp((notification) => {
			console.log(notification);
			console.log("hello");
			navigation.navigate(MainScreenNames.Chats, {});
			// const matchId = notification.data?.matchId;
			// if (!matchId) {
			// 	return;
			// }
			// const matchPreview = matchPreviews.filter((preview) => preview.id === matchId) as unknown as MatchPreview;
			// navigation.navigate(ScreenNames.MatchChat, {
			// 	matchId: matchPreview.id,
			// 	matchedUsers: matchPreview.matchedUsers,
			// 	matchTimestamp: getTimestampFromJSON(matchPreview.timestamp),
			// 	expiresAt: getTimestampFromJSON(matchPreview.expiresAt),
			// });
		});

		messaging()
			.getInitialNotification()
			.then(() => navigation.navigate(ScreenNames.Observer));
	}, [navigation, updateUser]);

	useEffect(() => {
		setObserving();
		FirebaseAppCheck(firebase.app())
			.activate("ignored", true)
			.then(() => {
				navigation.replace(ScreenNames.Login);
			});
	}, [navigation, setObserving]);

	return (
		<View style={styles.loadingContainer}>
			<Loading />
		</View>
	);
};

export default connector(Observer);
