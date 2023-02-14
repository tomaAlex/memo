import { useSignupFirstNameFormValidationRules } from "hooks/useFormValidationRules/useSignupFirstNameFormValidationRules";
import React from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, TouchableWithoutFeedback, View, SafeAreaView } from "react-native";
import connector from "redux/connector";
import { FirstNameForm, ScreenNames, ScreenProps } from "types";
import Header from "../Header";
import TextForm from "../TextForm";
import styles from "./FirstName.module.scss";

const FirstName = ({ navigation }: ScreenProps<ScreenNames.FirstName>) => {
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Identification.Labels" });
	const firstNameSchema = useSignupFirstNameFormValidationRules();
	const step = 1;

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={styles.container}>
				<Header stepNo={step} navigation={navigation} />
				<View style={styles.container__form}>
					<TextForm
						schema={firstNameSchema}
						initialValues={{ firstName: "" }}
						submissionHandler={(data) =>
							navigation.navigate(ScreenNames.LastName, {
								firstNameForm: data as unknown as FirstNameForm,
								stepNumber: step + 1,
							})
						}
						data={[
							{
								fieldName: "firstName",
								label: translateLabels("firstName"),
								isMandatory: true,
								placeholder: "John",
							},
						]}
					/>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default connector(FirstName);
