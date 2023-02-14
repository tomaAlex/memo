import { Formik } from "formik";
import { useSignupBirthdateFormValidationRules } from "hooks/useFormValidationRules/useSignupBirthdateFormValidationRules";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, SafeAreaView, Text, View, TouchableWithoutFeedback } from "react-native";
import connector from "redux/connector";
import { ScreenProps, ScreenNames } from "types";
import Header from "../Header";
import Label from "../Label";
import Submit from "../Submit";
import styles from "./Birthdate.module.scss";
import BirthdatePreview from "./BirthdatePreview";

const Birthdate = ({ navigation, route }: ScreenProps<ScreenNames.BirthDate>) => {
	const { lastNameForm, stepNumber } = route.params;
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Identification.Labels" });
	const birthDateSchema = useSignupBirthdateFormValidationRules();
	const getInitialDate = () => {
		const date = new Date();
		const year = date.getFullYear() - 18;
		date.setFullYear(year);
		date.setMonth(0);
		date.setDate(1);
		return date;
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={styles.container}>
				<Header stepNo={stepNumber} navigation={navigation} />
				<View style={styles.container__form}>
					<Formik
						validationSchema={birthDateSchema}
						initialValues={{ birthDate: getInitialDate() }}
						onSubmit={(values) => {
							// navigation.navigate(ScreenNames.Gender, {
							// 	birthdateForm: { birthDate: values.birthDate, ...lastNameForm },
							// 	stepNumber: stepNumber + 1,
							// });
							console.log(values.birthDate);
						}}
					>
						{({ values }) => (
							<>
								<Label fieldName={"birthDate"} label={translateLabels("birthDate")} isMandatory />
								<BirthdatePreview
									day={values.birthDate.getUTCDate()}
									month={values.birthDate.getMonth() + 1}
									year={values.birthDate.getFullYear()}
								/>
								<Submit spacing={"97%"} />
							</>
						)}
					</Formik>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default connector(Birthdate);
