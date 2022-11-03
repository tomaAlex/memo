import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import auth from "@react-native-firebase/auth";
import { SignInMethod } from "types/index";

export const signInWithFacebook: SignInMethod = async () => {
	try {
		await LoginManager.logInWithPermissions([]);
		const data = await AccessToken.getCurrentAccessToken();
		console.log(data);
		if (!data) {
			throw new Error("Something went wrong obtaining access token");
		}
		const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
		const userCredential = await auth().signInWithCredential(facebookCredential);
		return userCredential;
	} catch (error: any) {
		return Promise.reject(error);
	}
};
