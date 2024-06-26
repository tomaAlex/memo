import store from "redux/store";
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/firestore";

export const useProfileLiker = () => {
	const { user } = store.getState();
	return async (userProfileIdToLike: string) => {
		const userDocumentReference = firestore().collection("users").doc(user.id);
		const currentUserData = await userDocumentReference.get();
		const currentUserLikes = currentUserData.data()?.likes as string[];
		const newUserLikes = [...currentUserLikes, userProfileIdToLike];
		await userDocumentReference.update({ likes: newUserLikes });
		await firebase.functions().httpsCallable("sendLikeNotification")(userProfileIdToLike);
	};
};
