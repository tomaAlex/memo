import { useStripe } from "@stripe/stripe-react-native";
import { firebase } from "@react-native-firebase/functions";
import store from "redux/store";

const saveBankAccount = async (
	createToken: ReturnType<typeof useStripe>["createToken"],
	accountNumber: string,
	country: string,
	routingNumber: string,
	currency: string
): Promise<void> => {
	const { firstName, lastName } = store.getState().user;
	const fullName = `${firstName} ${lastName}`;
	const { token } = await createToken({
		type: "BankAccount",
		accountNumber,
		country,
		routingNumber,
		currency,
		accountHolderName: fullName,
	});
	await firebase.functions().httpsCallable("addCashOutBankAccount")({ token: token?.id as string });
};

export default saveBankAccount;
