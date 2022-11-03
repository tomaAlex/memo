import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { User } from "@react-native-google-signin/google-signin/lib/typescript/src/types";
import Config from "react-native-config";
import { SignInMethod } from "types";
import auth from "@react-native-firebase/auth";

GoogleSignin.configure({
	webClientId: Config.GOOGLE_SIGN_IN_WEB_CLIENT_ID,
	// iosClientId: Config.GOOGLE_SIGN_IN_IOS_CLIENT_ID,
});

export const signInWithGoogle: SignInMethod = async () => {
	try {
		console.log("signInWithGoogle");
		await GoogleSignin.hasPlayServices();
		console.log("hasPlayServices");
		const userInfo: User = await GoogleSignin.signIn();

		console.log("userInfo", userInfo);
		const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
		console.log("googleCredential", googleCredential);
		const userCredential = await auth().signInWithCredential(googleCredential);
		console.log("userCredential", userCredential);

		return userCredential;
	} catch (error: any) {
		console.error(JSON.stringify(error));
		switch (error.code) {
			case statusCodes.SIGN_IN_CANCELLED:
				// user cancelled the login flow
				break;
			case statusCodes.IN_PROGRESS:
				// operation (e.g. sign in) is in progress already
				break;
			case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
				// play services not available or outdated
				break;
			default:
				break;
		}
		return Promise.reject(error);
	}
};
