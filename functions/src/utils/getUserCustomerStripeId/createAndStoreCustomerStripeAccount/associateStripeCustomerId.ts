import { firestore } from "firebase-admin";

const associateStripeCustomerId = async (userId: string, stripeCustomerId: string): Promise<void> => {
	const userDocumentReference = firestore().collection("users").doc(userId) as firestore.DocumentReference<User>;
	await userDocumentReference.update({ stripeId: stripeCustomerId });
};

export default associateStripeCustomerId;
