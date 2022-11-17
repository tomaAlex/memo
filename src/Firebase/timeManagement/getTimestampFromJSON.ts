import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { JSONTimestamp } from "types/Firebase/JSONTimestamp";

export const getTimestampFromJSON = (timestamp: JSONTimestamp): FirebaseFirestoreTypes.Timestamp => {
	return new firestore.Timestamp(timestamp._seconds, timestamp._nanoseconds);
};
