import React from "react";
import { useSignupLastNameFormValidationRules } from "hooks/useFormValidationRules/useSignupLastNameFormValidationRules";
import { useTranslation } from "react-i18next";
import {
	Keyboard,
	TouchableWithoutFeedback,
	View,
	SafeAreaView,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import connector from "redux/connector";
import { ScreenNames, ScreenProps } from "types";
import Header from "../Header";
import TextForm from "../TextForm";

const LastName = ({ navigation, route }: ScreenProps<ScreenNames.LastName>) => {
	const { firstNameForm, stepNumber } = route.params;
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Signup.Forms.Identification.Labels",
	});
	console.log(firstNameForm);
	const lastNameSchema = useSignupLastNameFormValidationRules();
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={{ width: "90%", alignSelf: "center", height: "80%", alignContent: "center" }}>
				<Header stepNo={stepNumber} navigation={navigation} />
				<View style={{ marginTop: "10%" }}>
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
							},
						]}
					/>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default connector(LastName);
