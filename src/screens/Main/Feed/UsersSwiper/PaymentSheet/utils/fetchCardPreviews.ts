import { CardPreview } from "types/index";
import { firebase } from "@react-native-firebase/functions";

const fetchCardPreviews = async (): Promise<CardPreview[]> => {
	const { data } = await firebase.functions().httpsCallable("getCardPreviews")();
	return data as CardPreview[];
};

export default fetchCardPreviews;
