import React, { useEffect, useRef } from "react";
import connector from "../../redux/connector";
import auth from "@react-native-firebase/auth";
import { MainScreenNames, ScreenNames, ScreenProps } from "types/index";
import handleUserChange from "./utils/handleUserChange";
import handleLocationCollection from "./utils/handleLocationCollection";
import firebase from "@react-native-firebase/app";
import FirebaseAppCheck from "@react-native-firebase/app-check";
import messaging from "@react-native-firebase/messaging";

/**
 * A fake screen that is used to watch around for global updates.
 */
const Observer = ({ navigation, updateUser }: ScreenProps<ScreenNames.Observer>) => {
	const currentLocationCollectionRoutineReference = useRef<NodeJS.Timeout | null>(null);

	const setObserving = React.useCallback(() => {
		auth().onAuthStateChanged((user) => {
			handleUserChange(user, updateUser, navigation);
			handleLocationCollection(currentLocationCollectionRoutineReference, user?.uid);
		});

		// open notification from background state
		messaging().onNotificationOpenedApp(() => {
			navigation.navigate(MainScreenNames.Chats, {});
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

	return null;
};

export default connector(Observer);
