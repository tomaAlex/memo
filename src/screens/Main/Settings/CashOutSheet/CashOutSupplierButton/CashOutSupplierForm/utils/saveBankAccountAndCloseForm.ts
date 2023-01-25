import saveBankAccount from "./saveBankAccount";
import { useStripe } from "@stripe/stripe-react-native";

const saveBankAccountAndCloseForm = async (
	createToken: ReturnType<typeof useStripe>["createToken"],
	accountNumber: string,
	country: string,
	routingNumber: string,
	currency: string,
	onRequestClose: () => void
): Promise<void> => {
	await saveBankAccount(createToken, accountNumber, country, routingNumber, currency);
	onRequestClose();
};

export default saveBankAccountAndCloseForm;
