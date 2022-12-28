import { firestore } from "firebase-admin";
import { getUserCustomerStripeId, getUserData } from "../utils";

const getPayeeStripeCustomerId = async (payeeUserId: string): Promise<string> => {
	const payeeUserDocumentReference = firestore()
		.collection("users")
		.doc(payeeUserId) as firestore.DocumentReference<User>;
	const payeeUserData = await getUserData(payeeUserDocumentReference);
	return getUserCustomerStripeId({ ...payeeUserData, id: payeeUserId });
};

export default getPayeeStripeCustomerId;
