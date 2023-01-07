import React, { useState } from "react";
import { Formik } from "formik";
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useCashOutActivationFormValidationRules } from "hooks/index";
import styles from "./CashOutActivationForm.module.scss";
import FormTextInput from "components/forms/FormTextInput";
import FormFieldLabel from "components/forms/FormFieldLabel";
import activateAccount from "./utils/activateAccount";
import FormSwitchInput from "components/forms/FormSwitchInput";
import CashOutActivationFormTermNotes from "./CashOutActivationFormTermNotes";
import CashOutActivationFormMCCNotes from "./CashOutActivationFormMCCNotes";
import CashOutActivationFormSubmitButton from "./CashOutActivationFormSubmitButton";

type TProps = {
	setIsActivated: (isActivated: boolean) => void;
};

const CashOutActivationForm = ({ setIsActivated }: TProps) => {
	const cashOutActivationValidationSchema = useCashOutActivationFormValidationRules();
	const [isActivating, setIsActivating] = useState(false);
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutActivationForm.Labels",
	});
	const [translateErrors] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutActivationForm.Errors",
	});

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container__formContainer}>
					<Formik
						validationSchema={cashOutActivationValidationSchema}
						initialValues={{
							businessMcc: "",
							businessWebsite: "",
							termsAndConditions: false,
						}}
						onSubmit={async ({ businessMcc, businessWebsite, termsAndConditions }, { setErrors }) => {
							setIsActivating(true);
							try {
								await activateAccount(businessMcc, businessWebsite, termsAndConditions);
								setIsActivated(true);
							} catch (error) {
								setErrors({ termsAndConditions: translateErrors("general") });
							}
							setIsActivating(false);
						}}
					>
						<ScrollView style={styles.container__formContainer__form}>
							<CashOutActivationFormMCCNotes />
							<FormTextInput isMandatory field="businessMcc">
								<FormFieldLabel label={translateLabels("businessMcc")} />
							</FormTextInput>
							<FormTextInput isMandatory field="businessWebsite">
								<FormFieldLabel label={translateLabels("businessWebsite")} />
							</FormTextInput>
							<CashOutActivationFormTermNotes />
							<FormSwitchInput isMandatory field="termsAndConditions">
								<FormFieldLabel label={translateLabels("termsAndConditions")} />
							</FormSwitchInput>
							<CashOutActivationFormSubmitButton {...{ isActivating }} />
						</ScrollView>
					</Formik>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default React.memo(CashOutActivationForm);
