import { User } from "types/User";
import firestore from "@react-native-firebase/firestore";

export const createUserObject = async (user: User, uid?: string) => {
	if (uid) {
		await firestore().collection("Users").doc(uid).set(user);
		const createdUser = await firestore().collection("Users").doc(uid).get();
		console.log("Created user: ", createdUser.data());
	} else {
		console.log("No uid provided");
	}
};
