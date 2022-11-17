import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { JSONTimestamp } from "./JSONTimestamp";

export type LivedDocument<IsNativeTimestamp extends boolean = true> = {
	expiresAt: IsNativeTimestamp extends true ? FirebaseFirestoreTypes.Timestamp : JSONTimestamp;
};
