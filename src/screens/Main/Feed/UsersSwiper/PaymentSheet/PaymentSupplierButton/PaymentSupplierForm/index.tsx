import React from "react";
import { Modal, View, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { useTranslation } from "react-i18next";
import saveCardAndCloseForm from "./utils/saveCardAndCloseForm";

type TProps = {
	visible: boolean;
	onRequestClose: () => void;
};

const PaymentSupplierForm = ({ visible, onRequestClose }: TProps) => {
	const { createToken } = useStripe();
	const [t] = useTranslation();

	return (
		<Modal {...{ visible, onRequestClose }} animationType="slide">
			<SafeAreaView style={{ height: "50%", width: "100%", marginTop: "50%" }}>
				<CardField postalCodeEnabled={false} style={{ flex: 1 }} />
				<View style={{ flex: 1 }}>
					<TouchableOpacity
						style={{ alignSelf: "center" }}
						onPress={() => saveCardAndCloseForm(createToken, onRequestClose)}
					>
						<Text>{t("Screens.Signup.Forms.Labels.submit")}</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</Modal>
	);
};

export default React.memo(PaymentSupplierForm);
