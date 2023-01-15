import CashOutSheet from "../CashOutSheet";
import fetchBalance from "./utils/fetchBalance";
import styles from "./CashOutButton.module.scss";
import RBSheet from "react-native-raw-bottom-sheet";
import { Text, TouchableOpacity, View } from "react-native";
import getCashOutCaption from "./utils/getCashOutCaption";
import { MINIMUM_PENCE_BALANCE_TO_CASH_OUT } from "constants/index";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Loading from "components/Loading";
import { useTranslation } from "react-i18next";

type TProps = {
	hasInstantMatchingOn: boolean;
};

const CashOutButton = ({ hasInstantMatchingOn }: TProps) => {
	const [balance, setBalance] = useState(0);
	const [isBalanceLoading, setIsBalanceLoading] = useState(false);
	const [shouldFetchBalance, setShouldFetchBalance] = useState(true);
	const canCashOut = hasInstantMatchingOn && balance > MINIMUM_PENCE_BALANCE_TO_CASH_OUT;
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Settings.CashOutButton" });
	const refRBSheet = useRef<RBSheet>(null);

	const handleBalanceFetching = useCallback(async (): Promise<void> => {
		if (!shouldFetchBalance) {
			return;
		}
		setShouldFetchBalance(false);
		setIsBalanceLoading(true);
		const fetchedBalance = await fetchBalance();
		setIsBalanceLoading(false);
		setBalance(fetchedBalance);
	}, [shouldFetchBalance]);

	useEffect(() => {
		handleBalanceFetching();
	}, [handleBalanceFetching]);

	if (isBalanceLoading) {
		return (
			<View style={styles.loadingContainer}>
				<Loading />
			</View>
		);
	}

	return (
		<TouchableOpacity disabled={!canCashOut} style={styles.container} onPress={() => refRBSheet.current?.open()}>
			<Text style={styles.container__caption}>{getCashOutCaption(hasInstantMatchingOn, balance, t)}</Text>
			<CashOutSheet {...{ refRBSheet, setShouldFetchBalance }} />
		</TouchableOpacity>
	);
};

export default React.memo(CashOutButton);
