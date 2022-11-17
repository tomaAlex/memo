import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { JSONTimestamp } from "./JSONTimestamp";

export type TimestampedElement<IsNativeTimestamp extends boolean = true> = {
	timestamp: IsNativeTimestamp extends true ? FirebaseFirestoreTypes.Timestamp : JSONTimestamp;
};
