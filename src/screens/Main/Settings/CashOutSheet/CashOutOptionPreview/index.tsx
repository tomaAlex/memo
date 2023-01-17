import React from "react";
import { BankPreview } from "types/index";
import { Text, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import handleCashOut from "./utils/handleCashOut";
import styles from "./CashOutOptionPreview.module.scss";
import { Country } from "country-state-list";

type TProps = BankPreview & {
	refRBSheet: React.RefObject<RBSheet>;
	setShouldFetchBalance: (shouldFetchBalance: boolean) => void;
	setIsCashingOut: (isCashingOut: boolean) => void;
};

const CashOutOptionPreview = ({
	id,
	country,
	last4,
	routingNumber,
	refRBSheet,
	setShouldFetchBalance,
	setIsCashingOut,
}: TProps) => {
	const fireCashingOutRoutine = () => {
		handleCashOut(id, refRBSheet, setShouldFetchBalance, setIsCashingOut);
	};

	return (
		<TouchableOpacity style={styles.container} onPress={fireCashingOutRoutine}>
			<Text style={styles.container__text}>
				****** {last4} {routingNumber ? `(${routingNumber})` : ""} {Country.getCountryByCode(country)?.flag}
			</Text>
		</TouchableOpacity>
	);
};

export default React.memo(CashOutOptionPreview);
