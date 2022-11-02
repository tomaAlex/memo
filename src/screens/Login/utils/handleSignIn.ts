import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { checkUserObjectExists } from "Firebase/index";
import { NavigationStackTypes, ScreenNames, SignInMethod } from "types/index";

const handleSignIn = (
	fetchUserCredentials: SignInMethod,
	navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames.Login>
) => {
	return async () => {
		const userCredentials = await fetchUserCredentials();
		const isUserSignedUp = await checkUserObjectExists(userCredentials.user.uid);
		const nextScreen = isUserSignedUp ? ScreenNames.Main : ScreenNames.Identification;
		navigation.navigate(nextScreen);
	};
};

export default handleSignIn;
