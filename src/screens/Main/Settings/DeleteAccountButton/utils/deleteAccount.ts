import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/functions";
import { ScreenNames, ScreenProps, SettingsScreenNames } from "types/index";

const deleteAccount = async (
	setIsDeletingAccount: (isDeletingAccount: boolean) => void,
	navigation: ScreenProps<SettingsScreenNames.Preferences>["navigation"]
): Promise<void> => {
	setIsDeletingAccount(true);
	await firebase.functions().httpsCallable("deleteAccount")();
	await auth().signOut();
	setIsDeletingAccount(false);
	navigation.reset({
		index: 0,
		routes: [{ name: ScreenNames.Login }],
	});
};

export default deleteAccount;
