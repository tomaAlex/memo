import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import connector from "../../redux/connector";
import auth from "@react-native-firebase/auth";
import { ScreenNames, ScreenProps } from "types/index";
import handleUserChange from "./utils/handleUserChange";
import handleLocationCollection from "./utils/handleLocationCollection";
import firebase from "@react-native-firebase/app";
import FirebaseAppCheck from "@react-native-firebase/app-check";
import messaging from "@react-native-firebase/messaging";
import Loading from "components/Loading";
import styles from "./Observer.module.scss";
import { useTranslation } from "react-i18next";

/**
 * A fake screen that is used to watch around for global updates.
 */
const Observer = ({
	navigation,
	updateUser,
	setAwaitingLoginStatus,
	addNotification,
}: ScreenProps<ScreenNames.Observer>) => {
	// @ts-ignore, as NodeJS.Timeout is not recognized by TS in this case
	const currentLocationCollectionRoutineReference = useRef<NodeJS.Timeout | null>(null);
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Observer" });

	const setObserving = React.useCallback(() => {
		auth().onAuthStateChanged((user) => {
			handleUserChange(user, updateUser, setAwaitingLoginStatus, navigation, t);
			handleLocationCollection(currentLocationCollectionRoutineReference, user?.uid);
		});

		// open notification from background state
		messaging().onNotificationOpenedApp((notification) => {
			addNotification(notification);
		});

		messaging()
			.getInitialNotification()
			.then((notification) => {
				if (!notification) {
					return;
				}
				addNotification(notification);
			});
	}, [addNotification, navigation, setAwaitingLoginStatus, updateUser, t]);

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
