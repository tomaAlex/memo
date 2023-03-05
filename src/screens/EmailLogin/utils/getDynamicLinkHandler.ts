import auth from "@react-native-firebase/auth";
import { FirebaseDynamicLinksTypes } from "@react-native-firebase/dynamic-links";

export const getDynamicLinkHandler = (emailToLogin: string) => {
	return async (link: FirebaseDynamicLinksTypes.DynamicLink) => {
		console.log("Dynamic link received:", link.url);
		try {
			await auth().signInWithEmailLink(emailToLogin, link.url);
		} catch (error) {
			console.error("Error while signing user in:", error);
		}
	};
};
