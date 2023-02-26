import { RequireAtLeastOne, User } from "types/index";
import { useSelector } from "react-redux";
import { selectUser } from "redux/selectors";
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export const useFirebaseUserUpdater = () => {
	const { id } = useSelector(selectUser);

	return async (userUpdate: RequireAtLeastOne<User>): Promise<void> => {
		const userReference = firestore().collection("users").doc(id) as FirebaseFirestoreTypes.DocumentReference<User>;
		await userReference.update(userUpdate);
	};
};
