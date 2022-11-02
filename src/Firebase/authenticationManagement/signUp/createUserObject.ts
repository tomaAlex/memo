//This file will call a firebase function to create a user object in the database with uid as the key

import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "types/User";
import { db } from "../../firebaseConfig";

export const createUserObject = async (user: User, uid?: string) => {
	if (uid) {
		await setDoc(doc(db, "users", uid), user);
		const createdUser = await getDoc(doc(db, "users", uid));
		console.log("Created user: ", createdUser.data());
	} else {
		console.log("No uid provided");
	}
};
