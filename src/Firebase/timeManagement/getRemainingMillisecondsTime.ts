import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export const getRemainingMillisecondsTime = (deadlineTimestamp: FirebaseFirestoreTypes.Timestamp): number => {
	const deadlineTime = deadlineTimestamp.toDate().getTime();
	return deadlineTime - Date.now();
};
