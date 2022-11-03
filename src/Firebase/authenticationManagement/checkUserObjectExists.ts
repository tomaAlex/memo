import firestore from "@react-native-firebase/firestore";

export const checkUserObjectExists = async (uid: string) => {
	console.log("before db call");
	const possibleUserData = await firestore().collection("users").doc(uid).get();
	console.log("after db call", possibleUserData);
	return possibleUserData.exists;
};
