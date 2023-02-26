import { useSignupDescriptionFormValidationRules } from "hooks/useFormValidationRules/useSignupDescriptionFormValidationRules";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import connector from "redux/connector";
import { ScreenNames, ScreenProps } from "types";
import Header from "../Header";
import TextForm from "../TextForm";
import styles from "./Description.module.scss";

const Description = ({ navigation, route }: ScreenProps<ScreenNames.Description>) => {
	const { stepNumber, workForm } = route.params;
	const descriptionSchema = useSignupDescriptionFormValidationRules();
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Details.Labels" });

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={styles.container}>
				<Header stepNo={stepNumber} navigation={navigation} />
				<View style={styles.container__form}>
					<TextForm
						schema={descriptionSchema}
						initialValues={{ description: "" }}
						submissionHandler={(data) => {
							navigation.navigate(ScreenNames.Photos, {
								descriptionForm: { description: data.description, ...workForm },
								stepNumber: stepNumber + 1,
							});
						}}
						data={[
							{
								fieldName: "description",
								label: translateLabels("description"),
								isMandatory: false,
								placeholder: "Write a description. Get creative.",
								style: { paddingLeft: "7%" },
								multiline: true,
								textInputHeight: "77%",
							},
						]}
						buttonSpacing={"30%"}
					/>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default connector(Description);
