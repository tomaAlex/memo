import Stripe from "stripe";
import { auth } from "firebase-admin";
import * as functions from "firebase-functions";
import { stripeClient } from "./stripeClient";
import { getAuthenticatedUserData, getConnectAccount, getUserCustomerStripeId } from "./utils";

export const verifyConnectAccount = functions.https.onCall(async (data, context) => {
	const acceptedTOS = data.acceptedTOS as boolean;
	if (!acceptedTOS) {
		return;
	}
	const businessMcc = data.businessMcc as string;
	const businessWebsite = data.businessWebsite as string;
	const businessType = data.businessType as Stripe.AccountUpdateParams.BusinessType;
	const homeAddress = data.homeAddress as Stripe.AddressParam;
	const personalPhone = data.personalPhone as string;
	const businessPhone = data.businessPhone as string;
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const birthdate = new Date(authenticatedIdentifiedUserData.birthDate);
	const { firstName, lastName, id } = authenticatedIdentifiedUserData;
	const fullName = `${firstName} ${lastName}`;
	const businessName = businessType === "individual" ? fullName : (data.businessName as string);
	const stripeCustomerId = await getUserCustomerStripeId(authenticatedIdentifiedUserData);
	const connectAccount = await getConnectAccount(stripeCustomerId);
	const { email } = await auth().getUser(id);
	await stripeClient.accounts.update(connectAccount.id, {
		tos_acceptance: {
			date: Math.floor(Date.now() / 1000),
			ip: context.rawRequest.ip,
		},
		business_type: businessType,
		business_profile: {
			mcc: businessMcc,
			url: businessWebsite,
			name: businessName,
			support_phone: businessPhone,
		},
		individual: {
			first_name: firstName,
			last_name: lastName,
			dob: {
				day: birthdate.getDate(),
				month: birthdate.getMonth() + 1,
				year: birthdate.getFullYear(),
			},
			address: homeAddress,
			phone: personalPhone,
			email: email as string,
		},
	});
});
