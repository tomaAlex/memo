import { User } from "types/index";
import firestore from "@react-native-firebase/firestore";

export const getUserData = async (uid: string): Promise<User | null> => {
	const possibleUserData = await firestore().collection("users").doc(uid).get();
	if (!possibleUserData.exists) {
		return null;
	}
	return possibleUserData.data() as User;
};
