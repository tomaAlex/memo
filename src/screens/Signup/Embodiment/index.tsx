import React, { useState } from "react";
import { useSignupEmbodimentFormValidationRules } from "hooks/index";
import connector from "redux/connector";
import { EmbodimentForm, Orientation, ScreenNames, ScreenProps } from "types/index";
import { Keyboard, TouchableWithoutFeedback, View, SafeAreaView, ScrollView } from "react-native";
import { Formik } from "formik";
import FormSubmitButton from "components/forms/FormSubmitButton";
import FormTextInput from "components/forms/FormTextInput";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormChoicePicker, { FormChoicePickerItem } from "components/forms/FormChoicePicker";
import { convertChoicesToFormChoicePickerData } from "utils/index";
import { useTranslation } from "react-i18next";
import FormImagePicker from "components/forms/FormImagePicker";
import auth from "@react-native-firebase/auth";
import assembleUser from "./utils/assembleUser";
import storeUser from "./utils/storeUser";
import AppHeaderText from "components/Header/AppHeaderText";
import styles from "./Embodiment.module.scss";
import Loading from "components/Loading";

const Embodiment = ({
	navigation,
	route: {
		params: { identification, details },
	},
	updateUser,
}: ScreenProps<ScreenNames.Embodiment>) => {
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Embodiment.Labels" });
	const [isCreatingAccount, setIsCreatingAccount] = useState(false);
	const embodimentSchema = useSignupEmbodimentFormValidationRules();

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.container}>
				<AppHeaderText />
				<Formik
					validationSchema={embodimentSchema}
					initialValues={{
						height: undefined as unknown as number,
						orientation: "" as Orientation,
						photos: [] as string[],
					}}
					onSubmit={async (embodiment: EmbodimentForm) => {
						setIsCreatingAccount(true);
						const userToSignUp = await assembleUser(identification, details, embodiment);
						const createdUserId = auth().currentUser?.uid as string;
						await storeUser(userToSignUp, createdUserId, updateUser);
						setIsCreatingAccount(false);
						navigation.replace(ScreenNames.Main, { uid: createdUserId });
					}}
				>
					<ScrollView
						style={styles.container__form__dimensions}
						contentContainerStyle={{ marginTop: "9%", paddingBottom: "60%" }}
						showsVerticalScrollIndicator={false}
					>
						<FormTextInput isMandatory field="height" placeholder="181" keyboardType="numeric">
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
						<View style={styles.container__images}>
							<FormImagePicker field={"photos"}>
								<FormFieldLabel label={translateLabels("photos")} />
							</FormImagePicker>
						</View>
						<View style={styles.container__button}>{isCreatingAccount ? <Loading /> : <FormSubmitButton />}</View>
					</ScrollView>
				</Formik>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default connector(Embodiment);
