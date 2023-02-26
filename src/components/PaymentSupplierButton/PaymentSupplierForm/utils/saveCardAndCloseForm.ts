import saveCard from "./saveCard";
import { useStripe } from "@stripe/stripe-react-native";

const saveCardAndCloseForm = async (
	createToken: ReturnType<typeof useStripe>["createToken"],
	onRequestClose: () => void
): Promise<void> => {
	await saveCard(createToken);
	onRequestClose();
};

export default saveCardAndCloseForm;
