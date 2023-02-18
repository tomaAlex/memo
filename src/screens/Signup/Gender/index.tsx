import FormFieldError from "components/forms/FormFieldError";
import FormOptionSwitches from "components/forms/FormOptionSwitches";
import { Formik } from "formik";
import { useSignupGenderFormValidationRules } from "hooks/useFormValidationRules/useSignUpGenderFormValidationRules";
import React from "react";
import { useTranslation } from "react-i18next";
import { LogBox, SafeAreaView, View } from "react-native";
import connector from "redux/connector";
import { ScreenNames, ScreenProps } from "types";
import Header from "../Header";
import Label from "../Label";
import Submit from "../Submit";
import styles from "./Gender.module.scss";
import GenderElement from "./GenderElement";
import { Gender as GenderEnum } from "types";

const Gender = ({ navigation, route }: ScreenProps<ScreenNames.Gender>) => {
	const { stepNumber, birthdateForm } = route.params;
	LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Signup.Forms.Identification.Labels",
	});
	const genderSchema = useSignupGenderFormValidationRules();
	return (
		<SafeAreaView style={styles.container}>
			<Header navigation={navigation} stepNo={stepNumber} />
			<View style={styles.container__form}>
				<Formik
					validationSchema={genderSchema}
					initialValues={{ gender: "" }}
					onSubmit={(values) => {
						navigation.navigate(ScreenNames.Orientation, {
							genderForm: { gender: values.gender as GenderEnum, ...birthdateForm },
							stepNumber: stepNumber + 1,
						});
					}}
				>
					{({ errors, touched }) => (
						<>
							<Label fieldName={"gender"} label={translateLabels("gender")} isMandatory={true} />
							<FormOptionSwitches
								formOptionSwitches={[
									<GenderElement onlyFilteredGender={GenderEnum.FEMALE} key={1} />,
									<GenderElement onlyFilteredGender={GenderEnum.MALE} key={2} />,
									<GenderElement onlyFilteredGender={GenderEnum.OTHER} key={3} />,
								]}
								customErrorDisplay={
									<View style={styles.container__error}>
										<FormFieldError touched={touched} field={"gender"} errors={errors} />
									</View>
								}
							/>
							<Submit spacing={"0%"} />
						</>
					)}
				</Formik>
			</View>
		</SafeAreaView>
	);
};

export default connector(Gender);
