import React, { useState } from "react";
import { Modal, View, SafeAreaView, TouchableOpacity, Text, ImageBackground, Dimensions, Platform } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { useTranslation } from "react-i18next";
import saveCardAndCloseForm from "./utils/saveCardAndCloseForm";
import styles from "./PaymentSupplierForm.module.scss";
import Loading from "components/Loading";
import { CloseIcon } from "icons";

type TProps = {
	visible: boolean;
	onRequestClose: () => void;
};

const PaymentSupplierForm = ({ visible, onRequestClose }: TProps) => {
	const { createToken } = useStripe();
	const [isCardUploading, setIsCardUploading] = useState(false);
	const [t] = useTranslation("translation", { keyPrefix: "Components.PaymentSupplierButton" });

	const wd = Dimensions.get("screen").width;
	// const ht = Dimensions.get("screen").height;

	const handleSavingCardAndClosingForm = async () => {
		setIsCardUploading(true);
		await saveCardAndCloseForm(createToken, onRequestClose);
		setIsCardUploading(false);
	};

	return (
		<Modal {...{ visible, onRequestClose }} animationType="slide">
			<View style={styles.container__header}>
				<CloseIcon height={50} width={32} onPress={onRequestClose} style={styles.container__header__icon} />
				<Text style={styles.container__header__cardText}>Add Card</Text>
			</View>
			<SafeAreaView style={styles.container}>
				<ImageBackground
					source={require("../../PaymentOptionPreview/background.png")}
					style={[styles.container__image, { width: wd - 0.1 * wd }]}
					borderRadius={10}
				>
					<CardField
						postalCodeEnabled={false}
						style={styles.container__cardField}
						autofocus
						cardStyle={{
							textColor: "black",
							placeholderColor: Platform.OS === "android" ? "grey" : undefined,
							borderColor: "black",
							borderWidth: 1.25,
						}}
					/>
				</ImageBackground>
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
