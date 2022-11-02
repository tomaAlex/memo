import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { signInWithCredential } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { FacebookAuthProvider } from "firebase/auth";
import { SignInMethod } from "types/index";

export const signInWithFacebook: SignInMethod = async () => {
	try {
		await LoginManager.logInWithPermissions([]);
		const data = await AccessToken.getCurrentAccessToken();
		console.log(data);
		if (!data) {
			throw new Error("Something went wrong obtaining access token");
		}
		const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
		const userCredential = await signInWithCredential(auth, facebookCredential);
		return userCredential;
	} catch (error: any) {
		return Promise.reject(error);
	}
};
