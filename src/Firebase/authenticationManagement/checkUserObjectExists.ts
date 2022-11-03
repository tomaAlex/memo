import firestore from "@react-native-firebase/firestore";

export const checkUserObjectExists = async (uid: string) => {
	const possibleUserData = await firestore().collection("Users").doc(uid).get();
	return possibleUserData.exists;
};
