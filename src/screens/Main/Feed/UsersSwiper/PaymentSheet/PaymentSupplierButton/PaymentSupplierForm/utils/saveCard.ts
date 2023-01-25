import { useStripe } from "@stripe/stripe-react-native";
import { firebase } from "@react-native-firebase/functions";
import Config from "react-native-config";

const saveCard = async (createToken: ReturnType<typeof useStripe>["createToken"]): Promise<void> => {
	const { token } = await createToken({ type: "Card" });
	console.log("stripe env", Config.STRIPE_PUBLISHABLE_KEY);
	await firebase.functions().httpsCallable("addPaymentCard")({ token: token?.id as string });
};

export default saveCard;
