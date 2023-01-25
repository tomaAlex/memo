import Loading from "components/Loading";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { BankPreview } from "types/index";
import CashOutActivationForm from "./CashOutActivationForm";
import CashOutOptionPreview from "./CashOutOptionPreview";
import styles from "./CashOutSheet.module.scss";
import CashOutSupplierButton from "./CashOutSupplierButton";
import checkWhetherAccountIsVerified from "./utils/checkWhetherAccountIsVerified";
import fetchBankPreviews from "./utils/fetchBankPreviews";

type TProps = {
	refRBSheet: React.RefObject<RBSheet>;
	setShouldFetchBalance: (shouldFetchBalance: boolean) => void;
};

const CashOutSheet = ({ refRBSheet, setShouldFetchBalance }: TProps) => {
	const [bankPreviews, setBankPreviews] = useState<BankPreview[]>([]);
	const [shouldFetchBankAccounts, setShouldFetchBankAccounts] = useState(true);
	const [isCheckingActivation, setIsCheckingActivation] = useState(true);
	const [isCashingOut, setIsCashingOut] = useState(false);
	const [isActivated, setIsActivated] = useState(false);
	const isLoading = isCheckingActivation || isCashingOut;
	const [t] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutSheet",
	});

	const handleActivationChecking = async () => {
		setIsCheckingActivation(true);
		const canCashOut = await checkWhetherAccountIsVerified();
		setIsCheckingActivation(false);
		setIsActivated(canCashOut);
	};

	const handleBankPreviewsFetching = useCallback(async (): Promise<void> => {
		if (!shouldFetchBankAccounts) {
			return;
		}
		setShouldFetchBankAccounts(false);
		const fetchedBankPreviews = await fetchBankPreviews();
		setBankPreviews(fetchedBankPreviews);
	}, [shouldFetchBankAccounts]);

	useEffect(() => {
		handleBankPreviewsFetching();
	}, [handleBankPreviewsFetching]);

	return (
		// https://github.com/nysamnang/react-native-raw-bottom-sheet/issues/148
		// @ts-ignore
		<RBSheet
			ref={refRBSheet}
			customStyles={{
				container: styles.container,
				draggableIcon: styles.container__draggableIcon,
			}}
			height={500}
			onOpen={handleActivationChecking}
			closeOnDragDown
			closeOnPressMask
			keyboardAvoidingViewEnabled
		>
			<Text style={styles.container__title}>{t("title")}</Text>
			{isLoading && (
				<View style={styles.container__loading}>
					<Loading />
				</View>
			)}
			{!isLoading && !isActivated && <CashOutActivationForm {...{ setIsActivated }} />}
			{!isLoading && isActivated && (
				<FlatList
					style={styles.container__picker__container}
					data={bankPreviews}
					ItemSeparatorComponent={() => <View style={styles.container__picker__separator} />}
					ListHeaderComponent={() => <CashOutSupplierButton {...{ setShouldFetchBankAccounts }} />}
					renderItem={({ item }) => (
						<CashOutOptionPreview
							{...{
								...item,
								refRBSheet,
								setShouldFetchBalance,
								setIsCashingOut,
							}}
						/>
					)}
				/>
			)}
		</RBSheet>
	);
};

export default React.memo(CashOutSheet);
