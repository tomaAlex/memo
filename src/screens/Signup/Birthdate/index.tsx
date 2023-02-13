import React from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, SafeAreaView, Text, View, TouchableWithoutFeedback } from "react-native";
import connector from "redux/connector";
import { ScreenProps, ScreenNames } from "types";
import Header from "../Header";
import Label from "../Label";
import styles from "./Birthdate.module.scss";

const Birthdate = ({ navigation, route }: ScreenProps<ScreenNames.BirthDate>) => {
	const { lastNameForm, stepNumber } = route.params;
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Identification.Labels" });
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={styles.container}>
				<Header stepNo={stepNumber} navigation={navigation} />
				<View style={styles.container__form}>
					<Label fieldName={"birthDate"} label={translateLabels("birthDate")} isMandatory />
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default connector(Birthdate);
