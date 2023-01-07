import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import FullServiceAgreement from "./FullServiceAgreement";
import RecipientServiceAgreement from "./RecipientServiceAgreement";

const CashOutActivationFormTermNotes = () => {
	return (
		<TouchableWithoutFeedback>
			<View>
				<FullServiceAgreement />
				<RecipientServiceAgreement />
			</View>
		</TouchableWithoutFeedback>
	);
};

export default React.memo(CashOutActivationFormTermNotes);
