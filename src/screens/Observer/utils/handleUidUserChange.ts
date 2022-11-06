import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getUserData } from "Firebase/index";
import { NavigationStackTypes, ReduxProps, ScreenNames } from "types/index";

const handleUidUserChange = async (
	changedUserUid: string,
	updateUser: ReduxProps["updateUser"],
	navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames.Observer>
) => {
	const possibleUserData = await getUserData(changedUserUid);
	const isUserSignedUp = possibleUserData !== null;
	if (!isUserSignedUp) {
		navigation.navigate(ScreenNames.Identification);
		return;
	}
	updateUser({ ...possibleUserData, id: changedUserUid });
	navigation.replace(ScreenNames.Main);
};

export default handleUidUserChange;
