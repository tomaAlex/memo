import { Whitelist } from "types/index";
import { ALLOWED_DOMAINS } from "constants/index";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

const determineWhetherUserIsWhitelisted = async (userToCheckForWhitelist: FirebaseAuthTypes.User): Promise<boolean> => {
	const { email } = userToCheckForWhitelist;
	if (!email) {
		return false;
	}

	const emailDomain = email.split("@")[1];
	if (ALLOWED_DOMAINS.includes(emailDomain)) {
		return true;
	}
	const whitelistReference = firestore()
		.collection("users")
		.doc("whitelist") as FirebaseFirestoreTypes.DocumentReference<Whitelist>;
	const whitelistSnapshot = await whitelistReference.get();
	const whitelist = whitelistSnapshot.data();

	if (!whitelist) {
		return false;
	}

	return whitelist.emails.includes(email);
};

export default determineWhetherUserIsWhitelisted;
