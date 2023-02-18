import { useSignupHeightFormValidationRules } from "hooks/useFormValidationRules/useSignupHeightFormValidationRules";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, SafeAreaView, Keyboard, TouchableWithoutFeedback } from "react-native";
import connector from "redux/connector";
import { ScreenNames, ScreenProps } from "types";
import Header from "../Header";
import TextForm from "../TextForm";
import styles from "./Height.module.scss";

const Height = ({ navigation, route }: ScreenProps<ScreenNames.Height>) => {
	const { stepNumber, orientationForm } = route.params;
	const heightSchema = useSignupHeightFormValidationRules();
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Embodiment.Labels" });
	return (
		<SafeAreaView style={styles.container}>
			<Header stepNo={stepNumber} navigation={navigation} />
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.container__form}>
					<TextForm
						schema={heightSchema}
						initialValues={{ height: "" }}
						submissionHandler={(values) => console.log(values)}
						data={[
							{
								fieldName: "height",
								label: translateLabels("height"),
								isMandatory: true,
								placeholder: "e.g. 181",
							},
						]}
						buttonSpacing={"15%"}
					/>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default connector(Height);
