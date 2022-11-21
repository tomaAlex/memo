import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { getHoursAndMinutesPreview } from "utils/index";

export const getTimestampPreview = (timestampToPreview: FirebaseFirestoreTypes.Timestamp): string => {
	return getHoursAndMinutesPreview(timestampToPreview.toDate());
};
