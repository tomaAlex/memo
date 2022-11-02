import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const checkUserObjectExists = async (uid: string) => {
	const possibleUserData = await getDoc(doc(db, "users", uid));
	return possibleUserData.exists();
};
