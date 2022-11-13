import { User } from "types/User";
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import prepareUserCreation from "./prepareUserCreation";

export const createUserObject = async (
	user: User,
	uid: string
): Promise<FirebaseFirestoreTypes.DocumentSnapshot<User>> => {
	await prepareUserCreation(user, uid);
	await firestore().collection("users").doc(uid).set(user);
	const createdUserReference = firestore()
		.collection("users")
		.doc(uid) as FirebaseFirestoreTypes.DocumentReference<User>;
	return createdUserReference.get();
	// console.log("Created user: ", createdUser.data());
};
