import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import PaymentSupplierForm from "./PaymentSupplierForm";
import styles from "./PaymentSupplierButton.module.scss";
import { useTranslation } from "react-i18next";

type TProps = {
	setShouldFetchCards: (shouldFetchCards: boolean) => void;
};

const PaymentSupplierButtonComponent = ({ setShouldFetchCards }: TProps) => {
	const [showForm, setShowForm] = useState(false);
	const [t] = useTranslation("translation", { keyPrefix: "Components.PaymentSupplierButton" });

	return (
		<>
			<TouchableOpacity style={styles.container} onPress={() => setShowForm(true)}>
				<Text style={styles.container__caption}>{t("addCard")}</Text>
			</TouchableOpacity>
			<PaymentSupplierForm
				visible={showForm}
				onRequestClose={() => {
					setShouldFetchCards(true);
					setShowForm(false);
				}}
			/>
		</>
	);
};

export const PaymentSupplierButton = React.memo(PaymentSupplierButtonComponent);
