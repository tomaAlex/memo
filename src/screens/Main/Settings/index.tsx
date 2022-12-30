import React, { useState } from "react";
import { Keyboard, SafeAreaView, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { useUserUpdateFormValidationRules } from "hooks/index";
import { MainScreenNames, ScreenProps, User } from "types/index";
import connector from "../../../redux/connector";
import { Formik } from "formik";
import UpdateIdentificationForm from "./UpdateIdentificationForm";
import UpdateDetailsForm from "./UpdateDetailsForm";
import UpdateEmbodimentForm from "./UpdateEmbodimentForm";
import { updateUser as firebaseUpdateUser } from "Firebase/index";
import store from "redux/store";
import styles from "./Settings.module.scss";
import SettingsSubmitButton from "./SettingsSubmitButton";
import FormSwitchInput from "components/forms/FormSwitchInput";
import FormFieldLabel from "components/forms/FormFieldLabel";
import { useTranslation } from "react-i18next";
import CashOutButton from "./CashOutButton";

const Settings = ({
	user: {
		firstName,
		lastName,
		gender,
		birthDate,
		job,
		school,
		description,
		location,
		height,
		orientation,
		photos,
		id,
		hasInstantMatchingOn,
	},
}: ScreenProps<MainScreenNames.Settings>) => {
	const userUpdateSchema = useUserUpdateFormValidationRules();
	const locationCountry = location?.country;
	const locationState = location?.state;
	const locationCity = location?.city;
	const [isUserUpdating, setIsUserUpdating] = useState(false);
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Main.Settings.Labels" });

	return (
		<SafeAreaView style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container__formContainer}>
					<Formik
						validationSchema={userUpdateSchema}
						initialValues={{
							firstName,
							lastName,
							gender,
							birthDate,
							job,
							school,
							description,
							locationCountry,
							locationState,
							locationCity,
							height,
							orientation,
							photos,
							hasInstantMatchingOn,
						}}
						onSubmit={async (userUpdate) => {
							setIsUserUpdating(true);
							await firebaseUpdateUser(store.getState().user, userUpdate as unknown as User, id);
							setIsUserUpdating(false);
						}}
					>
						<ScrollView style={styles.container__formContainer__form}>
							<UpdateEmbodimentForm />
							<UpdateIdentificationForm />
							<UpdateDetailsForm />
							<FormSwitchInput isMandatory field="hasInstantMatchingOn">
								<FormFieldLabel label={translateLabels("hasInstantMatchingOn")} />
							</FormSwitchInput>
							<CashOutButton {...{ hasInstantMatchingOn }} />
							<SettingsSubmitButton {...{ isUserUpdating }} />
						</ScrollView>
					</Formik>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default connector(Settings);
