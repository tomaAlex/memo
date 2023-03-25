import { firebase } from "@react-native-firebase/functions";
import { IdentifiedUser } from "types/index";

export const fetchRecommendations = async () => {
	const { data } = await firebase.functions().httpsCallable("getRecommendations")();
	return data as IdentifiedUser[];
};
