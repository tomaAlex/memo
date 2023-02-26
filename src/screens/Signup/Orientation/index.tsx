import React from "react";
import GenderElement from "../Gender/GenderElement";
import FormFieldError from "components/forms/FormFieldError";
import FormOptionSwitches from "components/forms/FormOptionSwitches";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, View } from "react-native";
import { ScreenNames, ScreenProps } from "types";
import Header from "../Header";
import Label from "../Label";
import Submit from "../Submit";
import styles from "./Orientation.module.scss";
import { Orientation as OrientationEnum, Gender } from "types";
import { useSignUpOrientationFormValidationRules } from "hooks/useFormValidationRules/useSignUpOrientationFormValidationRules";
import connector from "redux/connector";
import OrientationElement from "./OrientationElement";

const Orientation = ({ navigation, route }: ScreenProps<ScreenNames.Orientation>) => {
	const { stepNumber, genderForm } = route.params;
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Embodiment.Labels" });
	const orientationSchema = useSignUpOrientationFormValidationRules();

	return (
		<SafeAreaView style={styles.container}>
			<Header navigation={navigation} stepNo={stepNumber} />
			<View style={styles.container__form}>
				<Formik
					validationSchema={orientationSchema}
					initialValues={{ orientation: "" as OrientationEnum }}
					onSubmit={(values) => {
						navigation.navigate(ScreenNames.Height, {
							stepNumber: stepNumber + 1,
							orientationForm: { ...values, ...genderForm },
						});
					}}
				>
					{({ touched, errors }) => (
						<>
							<Label fieldName={"orientation"} label={translateLabels("orientation")} isMandatory={true} />
							<FormOptionSwitches
								formOptionSwitches={[
									<OrientationElement onlyFilteredGender={Gender.FEMALE} gender={genderForm.gender} key={1} />,
									<OrientationElement onlyFilteredGender={Gender.MALE} gender={genderForm.gender} key={2} />,
								]}
								customErrorDisplay={
									<View style={styles.container__error}>
										<FormFieldError touched={touched} field={"orientation"} errors={errors} />
									</View>
								}
								customSwitchContainerStyle={styles.container__switches}
								children={<Text style={styles.container__selectionNote}>{translateLabels("orientationNote")}</Text>}
							/>
							<Submit spacing={"0%"} />
						</>
					)}
				</Formik>
			</View>
		</SafeAreaView>
	);
};

export default connector(Orientation);
