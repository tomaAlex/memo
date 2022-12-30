import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { BankPreview } from "types/index";
import CashOutOptionPreview from "./CashOutOptionPreview";
import styles from "./CashOutSheet.module.scss";
import CashOutSupplierButton from "./CashOutSupplierButton";
import fetchBankPreviews from "./utils/fetchBankPreviews";

type TProps = {
	refRBSheet: React.RefObject<RBSheet>;
	setShouldFetchBalance: (shouldFetchBalance: boolean) => void;
};

const CashOutSheet = ({ refRBSheet, setShouldFetchBalance }: TProps) => {
	const [bankPreviews, setBankPreviews] = useState<BankPreview[]>([]);
	const [shouldFetchBankAccounts, setShouldFetchBankAccounts] = useState(true);

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
		<RBSheet ref={refRBSheet} height={300} closeOnDragDown closeOnPressMask keyboardAvoidingViewEnabled>
			<FlatList
				style={styles.container__picker__container}
				data={bankPreviews}
				ListHeaderComponent={() => <CashOutSupplierButton {...{ setShouldFetchBankAccounts }} />}
				renderItem={({ item }) => (
					<CashOutOptionPreview
						{...{
							...item,
							refRBSheet,
							setShouldFetchBalance,
						}}
					/>
				)}
			/>
		</RBSheet>
	);
};

export default React.memo(CashOutSheet);
