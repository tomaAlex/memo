import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationStackTypes, ReduxProps, ScreenNames } from "types/index";
import handleUidUserChange from "./handleUidUserChange";

const handleUserChange = async (
	changedUser: FirebaseAuthTypes.User | null,
	updateUser: ReduxProps["updateUser"],
	navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames.Observer>
) => {
	if (!changedUser?.uid) {
		return;
	}
	await handleUidUserChange(changedUser.uid, updateUser, navigation);
};

export default handleUserChange;
