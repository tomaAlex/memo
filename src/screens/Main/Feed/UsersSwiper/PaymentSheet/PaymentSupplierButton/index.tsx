import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import PaymentSupplierForm from "./PaymentSupplierForm";
import styles from "./PaymentSupplierButton.module.scss";
import { useTranslation } from "react-i18next";

type TProps = {
	setShouldFetchCards: (shouldFetchCards: boolean) => void;
};

const PaymentSupplierButton = ({ setShouldFetchCards }: TProps) => {
	const [showForm, setShowForm] = useState(false);
	const [t] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Feed.UsersSwiper.PaymentSheet.PaymentSupplierButton",
	});

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

export default React.memo(PaymentSupplierButton);
