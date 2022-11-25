import React, { useEffect, useRef } from "react";
import connector from "../../redux/connector";
import auth from "@react-native-firebase/auth";
import { ScreenNames, ScreenProps } from "types/index";
import handleUserChange from "./utils/handleUserChange";
import handleLocationCollection from "./utils/handleLocationCollection";
import firebase from "@react-native-firebase/app";
import FirebaseAppCheck from "@react-native-firebase/app-check";

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
