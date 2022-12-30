import React, { useState } from "react";
import { Modal, View, SafeAreaView, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useTranslation } from "react-i18next";
import saveBankAccountAndCloseForm from "./utils/saveBankAccountAndCloseForm";
import { Formik } from "formik";
import FormSubmitButton from "components/forms/FormSubmitButton";
import { useCashOutFormValidationRules } from "hooks/index";
import styles from "./CashOutSupplierForm.module.scss";
import FormTextInput from "components/forms/FormTextInput";
import FormFieldLabel from "components/forms/FormFieldLabel";
import CountryChoicePicker from "./CountryChoicePicker";
import CurrencyChoicePicker from "./CurrencyChoicePicker";

type TProps = {
	visible: boolean;
	onRequestClose: () => void;
};

const CashOutSupplierForm = ({ visible, onRequestClose }: TProps) => {
	const { createToken } = useStripe();
	const cashOutSupplierValidationSchema = useCashOutFormValidationRules();
	const [isBankAccountUploading, setIsBankAccountUploading] = useState(false);
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutSupplierForm.Labels",
	});

	return (
		<Modal {...{ visible, onRequestClose }} animationType="slide">
			<SafeAreaView style={styles.container}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.container__formContainer}>
						<Formik
							validationSchema={cashOutSupplierValidationSchema}
							initialValues={{
								bankAccountNumber: "",
								bankAccountCountry: "",
								bankRoutingNumber: "",
								currency: "",
							}}
							onSubmit={async ({ bankAccountNumber, bankAccountCountry, bankRoutingNumber, currency }) => {
								setIsBankAccountUploading(true);
								await saveBankAccountAndCloseForm(
									createToken,
									bankAccountNumber,
									bankAccountCountry,
									bankRoutingNumber,
									currency,
									onRequestClose
								);
								setIsBankAccountUploading(false);
							}}
						>
							<ScrollView style={styles.container__formContainer__form}>
								<FormTextInput isMandatory field="bankAccountNumber">
									<FormFieldLabel label={translateLabels("bankAccountNumber")} />
								</FormTextInput>
								<CountryChoicePicker />
								<CurrencyChoicePicker />
								<FormTextInput field="bankRoutingNumber">
									<FormFieldLabel label={translateLabels("bankRoutingNumber")} />
								</FormTextInput>
								{!isBankAccountUploading && <FormSubmitButton />}
							</ScrollView>
						</Formik>
					</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		</Modal>
	);
};

export default React.memo(CashOutSupplierForm);
