import store from "redux/store";
import firestore from "@react-native-firebase/firestore";

export const useProfileDisliker = () => {
	const { user } = store.getState();
	return async (userProfileIdToDislike: string) => {
		// console.log("useProfileDisliker", userProfileIdToDislike);
		const userDocumentReference = firestore().collection("users").doc(user.id);
		// console.log("userDocumentReference", userDocumentReference);
		const currentUserData = await userDocumentReference.get();
		// console.log("currentUserData", currentUserData);
		const currentUserPossibleDislikes = currentUserData.data()?.dislikes as string[] | undefined;
		const currentUserDislikes = currentUserPossibleDislikes ?? [];
		const newUserDislikes = [...currentUserDislikes, userProfileIdToDislike];
		await userDocumentReference.update({ dislikes: newUserDislikes });
	};
};
