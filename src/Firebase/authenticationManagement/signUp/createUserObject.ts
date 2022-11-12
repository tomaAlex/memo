import { User } from "types/User";
import firestore from "@react-native-firebase/firestore";

export const createUserObject = async (user: User, uid: string) => {
	await firestore().collection("users").doc(uid).set(user);
	const createdUser = await firestore().collection("users").doc(uid).get();
	console.log("Created user: ", createdUser.data());
};
