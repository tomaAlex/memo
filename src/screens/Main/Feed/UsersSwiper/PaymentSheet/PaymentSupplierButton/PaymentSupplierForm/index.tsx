import React, { useState } from "react";
import { Modal, View, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { useTranslation } from "react-i18next";
import saveCardAndCloseForm from "./utils/saveCardAndCloseForm";
import styles from "./PaymentSupplierForm.module.scss";
import Loading from "components/Loading";

type TProps = {
	visible: boolean;
	onRequestClose: () => void;
};

const PaymentSupplierForm = ({ visible, onRequestClose }: TProps) => {
	const { createToken } = useStripe();
	const [isCardUploading, setIsCardUploading] = useState(false);
	const [t] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Feed.UsersSwiper.PaymentSheet.PaymentSupplierButton",
	});

	const handleSavingCardAndClosingForm = async () => {
		setIsCardUploading(true);
		await saveCardAndCloseForm(createToken, onRequestClose);
		setIsCardUploading(false);
	};

	return (
		<Modal {...{ visible, onRequestClose }} animationType="slide">
			<SafeAreaView style={styles.container}>
				<CardField postalCodeEnabled={false} style={styles.container__cardField} />
				<View style={styles.container__submitContainer}>
					{isCardUploading ? (
						<View style={styles.container__submitContainer__loading}>
							<Loading />
						</View>
					) : (
						<TouchableOpacity
							style={styles.container__submitContainer__submit}
							onPress={handleSavingCardAndClosingForm}
						>
							<Text style={styles.container__submitContainer__submit__caption}>{t("addCard")}</Text>
						</TouchableOpacity>
					)}
				</View>
			</SafeAreaView>
		</Modal>
	);
};

export default React.memo(PaymentSupplierForm);
