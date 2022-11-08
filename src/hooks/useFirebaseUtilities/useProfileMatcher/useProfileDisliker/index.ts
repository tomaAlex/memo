import store from "redux/store";
import firestore from "@react-native-firebase/firestore";

export const useProfileDisliker = () => {
	const { user } = store.getState();
	return async (userProfileIdToDislike: string) => {
		const userDocumentReference = firestore().collection("users").doc(user.id);
		const currentUserData = await userDocumentReference.get();
		const currentUserDislikes = currentUserData.data()?.dislikes as string[];
		const newUserDislikes = [...currentUserDislikes, userProfileIdToDislike];
		await userDocumentReference.update({ dislikes: newUserDislikes });
	};
};
