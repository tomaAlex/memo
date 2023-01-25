import { BankPreview } from "types/index";
import { firebase } from "@react-native-firebase/functions";

const fetchBankPreviews = async (): Promise<BankPreview[]> => {
	const { data } = await firebase.functions().httpsCallable("getBankPreviews")();
	return data as BankPreview[];
};

export default fetchBankPreviews;
