import { firebase } from "@react-native-firebase/functions";
import { IdentifiedUser } from "types/index";

const fetchRecommendations = async () => {
	// remove this in production
	firebase.app().functions().useEmulator("localhost", 5001);
	const { data } = await firebase.functions().httpsCallable("getRecommendations")();
	return data as IdentifiedUser[];
};

export default fetchRecommendations;
