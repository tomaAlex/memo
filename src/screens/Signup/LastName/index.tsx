import React from "react";
import { useSignupLastNameFormValidationRules } from "hooks/useFormValidationRules/useSignupLastNameFormValidationRules";
import { useTranslation } from "react-i18next";
import { Keyboard, TouchableWithoutFeedback, View, SafeAreaView, Platform } from "react-native";
import connector from "redux/connector";
import { ScreenNames, ScreenProps } from "types";
import Header from "../Header";
import TextForm from "../TextForm";
import styles from "./LastName.module.scss";

const LastName = ({ navigation, route }: ScreenProps<ScreenNames.LastName>) => {
	const { firstNameForm, stepNumber } = route.params;
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Signup.Forms.Identification.Labels",
	});
	const lastNameSchema = useSignupLastNameFormValidationRules();
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={styles.container}>
				<Header stepNo={stepNumber} navigation={navigation} />
				<View style={styles.container__form}>
					<TextForm
						schema={lastNameSchema}
						initialValues={{ lastName: "" }}
						submissionHandler={(data) =>
							navigation.navigate(ScreenNames.BirthDate, {
								lastNameForm: { lastName: data.lastName, ...firstNameForm },
								stepNumber: stepNumber + 1,
							})
						}
						data={[
							{
								fieldName: "lastName",
								label: translateLabels("lastName"),
								isMandatory: true,
								placeholder: "Doe",
								textInputHeight: Platform.OS === "android" ? "45%" : undefined,
							},
						]}
						buttonSpacing={"8%"}
					/>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default connector(LastName);
