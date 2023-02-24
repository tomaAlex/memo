import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationStackTypes, ReduxProps, ScreenNames } from "types/index";
import determineWhetherUserIsWhitelisted from "./determineWhetherUserIsWhitelisted";
import handleUidUserChange from "./handleUidUserChange";
import { TFunction } from "i18next";

const handleUserChange = async (
	changedUser: FirebaseAuthTypes.User | null,
	updateUser: ReduxProps["updateUser"],
	setAwaitingLoginStatus: ReduxProps["setAwaitingLoginStatus"],
	navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames.Observer>,
	t: TFunction
) => {
	if (!changedUser?.uid) {
		return;
	}
	const isUserWhitelisted = await determineWhetherUserIsWhitelisted(changedUser);
	if (!isUserWhitelisted) {
		try {
			await auth().signOut();
		} catch (error) {
			// user is already logged out
		}
		setAwaitingLoginStatus(false);
		navigation.navigate(ScreenNames.Observer);
		Alert.alert(t("notWhitelistedError.title"), t("notWhitelistedError.message"));
		return;
	}
	setAwaitingLoginStatus(true);
	await handleUidUserChange(changedUser.uid, updateUser, navigation);
};

export default handleUserChange;
