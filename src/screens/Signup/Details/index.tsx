import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import connector from "../../../redux/connector";
import { ScreenNames, ScreenProps } from "types/index";
import { Formik } from "formik";
import FormTextInput from "components/forms/FormTextInput";
import { useSignupDetailsFormValidationRules } from "hooks/index";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormSubmitButton from "components/forms/FormSubmitButton";
import CountryChoicePicker from "./CountryChoicePicker";
import StateAndCityFields from "./StateAndCityFields";
import getSubmissionHandler from "./utils/getSubmissionHandler";
import { useTranslation } from "react-i18next";

const Details = ({
	navigation,
	route: {
		params: { identification },
	},
}: ScreenProps<ScreenNames.Details>) => {
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Details.Labels" });
	const detailsSchema = useSignupDetailsFormValidationRules();
	const [selectedCountryCode, setSelectedCountryCode] = useState<string>();

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Formik
					validationSchema={detailsSchema}
					initialValues={{
						job: "",
						school: "",
						description: "",
						locationCountry: "",
						locationState: "",
						locationCity: "",
					}}
					onSubmit={getSubmissionHandler(navigation, identification)}
				>
					<View style={{ width: "80%" }}>
						<FormTextInput field="job" placeholder="Graphic Designer">
							<FormFieldLabel label={translateLabels("job")} />
						</FormTextInput>
						<FormTextInput field="school" placeholder="King's College London">
							<FormFieldLabel label={translateLabels("school")} />
						</FormTextInput>
						<FormTextInput field="description" placeholder="I like playing guitar and exercising">
							<FormFieldLabel label={translateLabels("description")} />
						</FormTextInput>
						<CountryChoicePicker {...{ selectedCountryCode, setSelectedCountryCode }} />
						{selectedCountryCode && <StateAndCityFields selectedCountryCode={selectedCountryCode} />}
						<View style={{ marginTop: 50 }}>
							<FormSubmitButton />
						</View>
					</View>
				</Formik>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default connector(Details);
