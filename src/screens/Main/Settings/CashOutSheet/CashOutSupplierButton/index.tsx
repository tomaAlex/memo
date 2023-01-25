import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import CashOutSupplierForm from "./CashOutSupplierForm";
import styles from "./CashOutSupplierButton.module.scss";
import { useTranslation } from "react-i18next";

type TProps = {
	setShouldFetchBankAccounts: (shouldFetchBankAccounts: boolean) => void;
};

const CashOutSupplierButton = ({ setShouldFetchBankAccounts }: TProps) => {
	const [showForm, setShowForm] = useState(false);
	const [t] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutSupplierButton",
	});

	return (
		<>
			<TouchableOpacity style={styles.container} onPress={() => setShowForm(true)}>
				<Text style={styles.container__text}>{t("addBankAccount")}</Text>
			</TouchableOpacity>
			<CashOutSupplierForm
				visible={showForm}
				onRequestClose={() => {
					setShouldFetchBankAccounts(true);
					setShowForm(false);
				}}
			/>
		</>
	);
};

export default React.memo(CashOutSupplierButton);
