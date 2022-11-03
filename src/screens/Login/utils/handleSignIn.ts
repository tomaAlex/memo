import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { checkUserObjectExists } from "Firebase/index";
import { NavigationStackTypes, ScreenNames, SignInMethod } from "types/index";

const handleSignIn = (
	fetchUserCredentials: SignInMethod,
	navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames.Login>
) => {
	return async () => {
		const userCredentials = await fetchUserCredentials();
		console.log("userCredentials", userCredentials);
		const isUserSignedUp = await checkUserObjectExists(userCredentials.user.uid);
		console.log("isUserSignedUp", isUserSignedUp);
		const nextScreen = isUserSignedUp ? ScreenNames.Main : ScreenNames.Identification;
		navigation.navigate(nextScreen);
	};
};

export default handleSignIn;
