import store from "redux/store";
import firestore from "@react-native-firebase/firestore";

export const useProfileLiker = () => {
	const { user } = store.getState();
	return async (userProfileIdToLike: string) => {
		const userDocumentReference = firestore().collection("users").doc(user.id);
		const currentUserData = await userDocumentReference.get();
		const currentPossibleUserLikes = currentUserData.data()?.likes as string[] | undefined;
        const currentUserLikes = currentPossibleUserLikes ?? [];
		const newUserLikes = [...currentUserLikes, userProfileIdToLike];
		await userDocumentReference.update({ likes: newUserLikes });
	};
};
