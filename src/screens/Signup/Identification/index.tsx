import React from "react";
import { Keyboard, TouchableWithoutFeedback, View, ScrollView, SafeAreaView } from "react-native";
import connector from "../../../redux/connector";
import "../../../translations/i18.config";
import { Gender, IdentificationForm, ScreenNames, ScreenProps } from "types/index";
import { Formik } from "formik";
import FormTextInput from "components/forms/FormTextInput";
import FormChoicePicker, { FormChoicePickerItem } from "components/forms/FormChoicePicker";
import FormDatePicker from "components/forms/FormDatePicker";
import AppHeaderText from "components/Header/AppHeaderText";
import { useSignupIdentificationFormValidationRules } from "hooks/index";
import FormSubmitButton from "components/forms/FormSubmitButton";
import FormFieldLabel from "components/forms/FormFieldLabel";
import { convertChoicesToFormChoicePickerData } from "utils/index";
import { useTranslation } from "react-i18next";
import styles from "./Identification.module.scss";

const Identification = ({ navigation }: ScreenProps<ScreenNames.Identification>) => {
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Identification.Labels" });
	const identificationSchema = useSignupIdentificationFormValidationRules();

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.container}>
				<AppHeaderText />
				<Formik
					validationSchema={identificationSchema}
					initialValues={{ firstName: "", lastName: "", gender: "", birthDate: "" }}
					onSubmit={(identification) =>
						navigation.navigate("Details", { identification: identification as unknown as IdentificationForm })
					}
				>
					<ScrollView
						style={styles.container__form__dimensions}
						contentContainerStyle={{ marginTop: "15%", paddingBottom: "20%" }}
						showsVerticalScrollIndicator={false}
					>
						<FormTextInput isMandatory field="firstName" placeholder="John">
							<FormFieldLabel label={translateLabels("firstName")} />
						</FormTextInput>
						<FormTextInput isMandatory field="lastName" placeholder="Smith">
							<FormFieldLabel label={translateLabels("lastName")} />
						</FormTextInput>
						<FormChoicePicker
							isMandatory
							data={convertChoicesToFormChoicePickerData(Gender)}
							renderItem={FormChoicePickerItem}
							field="gender"
							optionContainerStyle={{
								backgroundColor: "white",
								paddingVertical: "10%",
								borderRadius: 30,
							}}
							optionTextStyle={{
								fontFamily: "Poppins-Regular",
							}}
							cancelTextStyle={{
								fontFamily: "Poppins-Regular",
							}}
							cancelStyle={{
								backgroundColor: "white",
								borderRadius: 30,
							}}
							search={false}
						>
							<FormFieldLabel label={translateLabels("gender")} />
						</FormChoicePicker>
						<FormDatePicker isMandatory field="birthDate">
							<FormFieldLabel label={translateLabels("birthDate")} />
						</FormDatePicker>
						<View style={styles.container__button}>
							<FormSubmitButton />
						</View>
					</ScrollView>
				</Formik>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default connector(Identification);
