import { useSignupWorkFormValidationRules } from "hooks/useFormValidationRules/useSignupWorkFormValidationRules";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, SafeAreaView, TouchableWithoutFeedback, Keyboard } from "react-native";
import connector from "redux/connector";
import { ScreenNames, ScreenProps } from "types";
import Header from "../Header";
import TextForm from "../TextForm";
import styles from "./Work.module.scss";

const Work = ({ navigation, route }: ScreenProps<ScreenNames.Work>) => {
	const { stepNumber, heightForm } = route.params;
	const workSchema = useSignupWorkFormValidationRules();
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Details.Labels" });

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={styles.container}>
				<Header stepNo={stepNumber} navigation={navigation} />
				<View style={styles.container__form}>
					<TextForm
						schema={workSchema}
						initialValues={{ job: "" }}
						submissionHandler={(data) =>
							// navigation.navigate(ScreenNames.BirthDate, {
							// 	lastNameForm: { lastName: data.lastName, ...firstNameForm },
							// 	stepNumber: stepNumber + 1,
							// })
							console.log(data)
						}
						data={[
							{
								fieldName: "job",
								label: translateLabels("job"),
								isMandatory: false,
								placeholder: "e.g. Graphic Designer",
								style: { paddingLeft: "7%" },
							},
						]}
					/>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default connector(Work);
