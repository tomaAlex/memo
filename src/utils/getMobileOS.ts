import { Platform } from "react-native";

export const getMobileOS = () => {
	if (Platform.OS === "android") {
		return "android";
	}
	return "ios";
};
