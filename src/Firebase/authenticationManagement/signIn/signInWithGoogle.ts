import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { User } from "@react-native-google-signin/google-signin/lib/typescript/src/types";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import Config from "react-native-config";
import { SignInMethod } from "types";
import { auth } from "../../firebaseConfig";

GoogleSignin.configure({
	webClientId: Config.GOOGLE_SIGN_IN_WEB_CLIENT_ID,
	iosClientId: Config.GOOGLE_SIGN_IN_IOS_CLIENT_ID,
});

export const signInWithGoogle: SignInMethod = async () => {
	try {
		await GoogleSignin.hasPlayServices();
		const userInfo: User = await GoogleSignin.signIn();

		const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
		const userCredential = await signInWithCredential(auth, googleCredential);

		return userCredential;
	} catch (error: any) {
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
