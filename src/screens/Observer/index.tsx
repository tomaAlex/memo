import React, { useEffect } from "react";
import connector from "../../redux/connector";
import auth from "@react-native-firebase/auth";
import { ScreenNames, ScreenProps } from "types/index";
import handleUserChange from "./utils/handleUserChange";

/**
 * A fake screen that is used to watch around for global updates.
 */
const Observer = ({ navigation, updateUser }: ScreenProps<ScreenNames.Observer>) => {
	const setObserving = () => {
		auth().onAuthStateChanged((user) => handleUserChange(user, updateUser, navigation));
	};

	useEffect(() => {
		setObserving();
		navigation.replace(ScreenNames.Login);
	}, []);

	return null;
};

export default connector(Observer);
