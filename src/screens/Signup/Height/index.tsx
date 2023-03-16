import { useSignupHeightFormValidationRules } from "hooks/useFormValidationRules/useSignupHeightFormValidationRules";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View, SafeAreaView, Keyboard, TouchableWithoutFeedback, Platform } from "react-native";
import connector from "redux/connector";
import { ScreenNames, ScreenProps } from "types";
import Header from "../Header";
import TextForm from "../TextForm";
import styles from "./Height.module.scss";
import { setAdjustNothing } from "rn-android-keyboard-adjust";

const Height = ({ navigation, route }: ScreenProps<ScreenNames.Height>) => {
	const { stepNumber, orientationForm } = route.params;
	const heightSchema = useSignupHeightFormValidationRules();
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Embodiment.Labels" });

	useEffect(() => {
		setAdjustNothing();
	}, []);
	return (
		<SafeAreaView style={styles.container}>
			<Header stepNo={stepNumber} navigation={navigation} />
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.container__form}>
					<TextForm
						schema={heightSchema}
						initialValues={{ height: "" }}
						submissionHandler={(values) => {
							navigation.navigate(ScreenNames.Work, {
								heightForm: { height: values.height, ...orientationForm },
								stepNumber: stepNumber + 1,
							});
						}}
						data={[
							{
								fieldName: "height",
								label: translateLabels("height"),
								isMandatory: true,
								placeholder: "e.g. 181",
								textInputHeight: Platform.OS === "android" ? "45%" : undefined,
								keyboardType: "numeric",
							},
						]}
						buttonSpacing={"8%"}
					/>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default connector(Height);
