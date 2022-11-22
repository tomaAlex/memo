import { firebase } from "@react-native-firebase/functions";
import { MatchPreview } from "types/index";

const fetchMatchPreviews = async () => {
	const { data } = await firebase.functions().httpsCallable("getMatchPreviews")();
	return data as MatchPreview[];
};

export default fetchMatchPreviews;
