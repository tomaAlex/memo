import React from "react";
import { useSignupEmbodimentFormValidationRules } from "hooks/index";
import connector from "redux/connector";
import { EmbodimentForm, Orientation, ScreenNames, ScreenProps } from "types/index";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Formik } from "formik";
import FormSubmitButton from "components/forms/FormSubmitButton";
import FormTextInput from "components/forms/FormTextInput";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormChoicePicker, { FormChoicePickerItem } from "components/forms/FormChoicePicker";
import { convertChoicesToFormChoicePickerData } from "utils/index";
import { useTranslation } from "react-i18next";
import FormImagePicker from "components/forms/FormImagePicker";
import { createUserObject } from "Firebase/index";
import auth from "@react-native-firebase/auth";
import assembleUser from "./utils/assembleUser";

const Embodiment = ({
	navigation,
	route: {
		params: { identification, details },
	},
}: ScreenProps<ScreenNames.Embodiment>) => {
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Embodiment.Labels" });
	const embodimentSchema = useSignupEmbodimentFormValidationRules();

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Formik
					validationSchema={embodimentSchema}
					initialValues={{
						height: undefined as unknown as number,
						orientation: "" as Orientation,
						photos: [] as string[],
					}}
					onSubmit={async (embodiment: EmbodimentForm) => {
						const userToSignUp = await assembleUser(identification, details, embodiment);
						const createdUserId = auth().currentUser?.uid as string;
						await createUserObject(userToSignUp, createdUserId);
						navigation.navigate(ScreenNames.Main, { uid: createdUserId });
					}}
				>
					<View style={{ width: "80%" }}>
						<FormTextInput field="height" placeholder="181" keyboardType="numeric">
							<FormFieldLabel label={translateLabels("height")} />
						</FormTextInput>
						<FormChoicePicker
							isMandatory
							data={convertChoicesToFormChoicePickerData(Orientation)}
							renderItem={FormChoicePickerItem}
							field="orientation"
						>
							<FormFieldLabel label={translateLabels("orientation")} />
						</FormChoicePicker>
						<View style={{ height: "50%" }}>
							<FormImagePicker field={"photos"}>
								<FormFieldLabel label={translateLabels("photos")} />
							</FormImagePicker>
						</View>
						<View style={{ marginTop: 50 }}>
							<FormSubmitButton />
						</View>
					</View>
				</Formik>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default connector(Embodiment);
