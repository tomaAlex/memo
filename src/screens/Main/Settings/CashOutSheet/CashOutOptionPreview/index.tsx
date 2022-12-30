import React from "react";
import { BankPreview } from "types/index";
import { Text, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import handleCashOut from "./utils/handleCashOut";

type TProps = BankPreview & {
	refRBSheet: React.RefObject<RBSheet>;
	setShouldFetchBalance: (shouldFetchBalance: boolean) => void;
};

const CashOutOptionPreview = ({ id, country, last4, routingNumber, refRBSheet, setShouldFetchBalance }: TProps) => {
	const fireCashingOutRoutine = () => {
		handleCashOut(id, refRBSheet, setShouldFetchBalance);
	};

	return (
		<TouchableOpacity onPress={fireCashingOutRoutine}>
			<Text>
				{id}, {country}, {last4}, {routingNumber}
			</Text>
		</TouchableOpacity>
	);
};

export default React.memo(CashOutOptionPreview);
