import CashOutSheet from "../CashOutSheet";
import fetchBalance from "./utils/fetchBalance";
import styles from "./CashOutButton.module.scss";
import RBSheet from "react-native-raw-bottom-sheet";
import { Text, TouchableOpacity } from "react-native";
import getCashOutCaption from "./utils/getCashOutCaption";
import { MINIMUM_PENCE_BALANCE_TO_CASH_OUT } from "constants/index";
import React, { useCallback, useEffect, useRef, useState } from "react";

type TProps = {
	hasInstantMatchingOn: boolean;
};

const CashOutButton = ({ hasInstantMatchingOn }: TProps) => {
	const [balance, setBalance] = useState(0);
	const [shouldFetchBalance, setShouldFetchBalance] = useState(true);
	const canCashOut = hasInstantMatchingOn && balance > MINIMUM_PENCE_BALANCE_TO_CASH_OUT;
	const refRBSheet = useRef<RBSheet>(null);

	const handleBalanceFetching = useCallback(async (): Promise<void> => {
		if (!shouldFetchBalance) {
			return;
		}
		setShouldFetchBalance(false);
		const fetchedBalance = await fetchBalance();
		setBalance(fetchedBalance);
	}, [shouldFetchBalance]);

	useEffect(() => {
		handleBalanceFetching();
	}, [handleBalanceFetching]);

	return (
		<TouchableOpacity disabled={!canCashOut} style={styles.container} onPress={() => refRBSheet.current?.open()}>
			<Text style={styles.container__caption}>{getCashOutCaption(hasInstantMatchingOn, balance)}</Text>
			<CashOutSheet {...{ refRBSheet, setShouldFetchBalance }} />
		</TouchableOpacity>
	);
};

export default React.memo(CashOutButton);
