import { useStripe } from "@stripe/stripe-react-native";
import { firebase } from "@react-native-firebase/functions";

const saveCard = async (createToken: ReturnType<typeof useStripe>["createToken"]): Promise<void> => {
	const { token } = await createToken({ type: "Card" });
	await firebase.functions().httpsCallable("addPaymentCard")({ token: token?.id as string });
};

export default saveCard;
