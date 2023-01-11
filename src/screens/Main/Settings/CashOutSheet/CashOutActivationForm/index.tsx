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
import BusinessTypePicker from "./BusinessTypePicker";
import HomeAddressInputs from "./HomeAddressInputs";
import { AddressParam, BusinessType } from "types/index";

type TProps = {
	setIsActivated: (isActivated: boolean) => void;
};

const CashOutActivationForm = ({ setIsActivated }: TProps) => {
	const cashOutActivationValidationSchema = useCashOutActivationFormValidationRules();
	const [isActivating, setIsActivating] = useState(false);
	const [isBusinessNameRequired, setIsBusinessNameRequired] = useState(false);
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
							businessType: "individual" as BusinessType,
							businessName: undefined as string | undefined,
							homeAddressLine1: "",
							homeAddressLine2: undefined as string | undefined,
							homeAddressCountry: undefined as unknown as string,
							homeAddressState: undefined as unknown as string,
							homeAddressCity: "",
							homeAddressPostalCode: "",
							businessMcc: "",
							businessWebsite: "",
							personalPhone: "",
							businessPhone: "",
							termsAndConditions: false,
						}}
						onSubmit={async (
							{
								businessType,
								businessName,
								homeAddressLine1,
								homeAddressLine2,
								homeAddressCountry,
								homeAddressState,
								homeAddressCity,
								homeAddressPostalCode,
								businessMcc,
								businessWebsite,
								personalPhone,
								businessPhone,
								termsAndConditions,
							},
							{ setErrors }
						) => {
							setIsActivating(true);
							try {
								const homeAddress: AddressParam = {
									line1: homeAddressLine1,
									line2: homeAddressLine2,
									country: homeAddressCountry,
									state: homeAddressState,
									city: homeAddressCity,
									postal_code: homeAddressPostalCode,
								};
								await activateAccount(
									businessType,
									businessName,
									homeAddress,
									businessMcc,
									businessWebsite,
									personalPhone,
									businessPhone,
									termsAndConditions
								);
								setIsActivated(true);
							} catch (error) {
								setErrors({ termsAndConditions: translateErrors("general") });
							}
							setIsActivating(false);
						}}
					>
						<ScrollView style={styles.container__formContainer__form}>
							<BusinessTypePicker {...{ setIsBusinessNameRequired }} />
							{isBusinessNameRequired && (
								<FormTextInput isMandatory={isBusinessNameRequired} field="businessName">
									<FormFieldLabel label={translateLabels("businessName")} />
								</FormTextInput>
							)}
							<HomeAddressInputs />
							<FormTextInput isMandatory field="personalPhone">
								<FormFieldLabel label={translateLabels("personalPhone")} />
							</FormTextInput>
							<FormTextInput isMandatory field="businessPhone">
								<FormFieldLabel label={translateLabels("businessPhone")} />
							</FormTextInput>
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
