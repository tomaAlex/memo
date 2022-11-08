import { User } from "types/User";
import firestore from "@react-native-firebase/firestore";
import { enhanceUserForBackendStorage } from "./enhanceUserForBackendStorage";

export const createUserObject = async (user: User, uid: string) => {
	const enhancedUserForBackendStorage = enhanceUserForBackendStorage(user);
	await firestore().collection("users").doc(uid).set(enhancedUserForBackendStorage);
	const createdUser = await firestore().collection("users").doc(uid).get();
	console.log("Created user: ", createdUser.data());
};
