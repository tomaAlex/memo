import { firebase } from "@react-native-firebase/firestore";
import { AddressParam, BusinessType } from "types/index";

const activateAccount = async <ChosenBusinessType extends BusinessType>(
	businessType: ChosenBusinessType,
	businessName: ChosenBusinessType extends "individual" ? undefined : string,
	homeAddress: AddressParam,
	businessMcc: string,
	businessWebsite: string,
	personalPhone: string,
	businessPhone: string,
	termsAndConditions: boolean
): Promise<void> => {
	await firebase.functions().httpsCallable("verifyConnectAccount")({
		businessType,
		businessName,
		homeAddress,
		businessMcc,
		businessWebsite,
		acceptedTOS: termsAndConditions,
		personalPhone,
		businessPhone,
	});
};

export default activateAccount;
