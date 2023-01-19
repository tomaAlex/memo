// import { Formik } from "formik";
// import { useUserUpdateFormValidationRules } from "hooks";
import React from "react";
import { SafeAreaView, View } from "react-native";
import connector from "redux/connector";
import { ScreenProps, SettingsScreenNames } from "types/index";
import SettingsSectionButtons from "./SettingsSectionButtons";
import SettingsUserPreviewHeader from "../SettingsUserPreviewHeader";
import styles from "./SettingsPanel.module.scss";

const SettingsPanel = ({}: ScreenProps<SettingsScreenNames.SettingsPanel>) => {
	// const userUpdateSchema = useUserUpdateFormValidationRules();
	// const locationCountry = location?.country;
	// const locationState = location?.state;
	// const locationCity = location?.city;
	// const [isUserUpdating, setIsUserUpdating] = useState(false);
	// const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Main.Settings.Labels" });
	return (
		// <Formik
		// 	validationSchema={userUpdateSchema}
		// 	initialValues={{
		// 		firstName,
		// 		lastName,
		// 		gender,
		// 		birthDate,
		// 		job,
		// 		school,
		// 		description,
		// 		locationCountry,
		// 		locationState,
		// 		locationCity,
		// 		height,
		// 		orientation,
		// 		photos,
		// 		hasInstantMatchingOn,
		// 	}}
		// 	onSubmit={async (userUpdate) => {
		// 		setIsUserUpdating(true);
		// 		await firebaseUpdateUser(store.getState().user, userUpdate as unknown as User, id);
		// 		setIsUserUpdating(false);
		// 	}}
		// >
		<SafeAreaView style={styles.container}>
			{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
			{/* <View style={styles.container__formContainer}> */}
			<View style={styles.container__header}>
				<SettingsUserPreviewHeader />
			</View>
			<View style={styles.container__body}>
				<SettingsSectionButtons />
			</View>
			{/* <ScrollView style={styles.container__formContainer__form}>
							<UpdateEmbodimentForm />
							<UpdateIdentificationForm />
							<UpdateDetailsForm />
							<FormSwitchInput isMandatory field="hasInstantMatchingOn">
								<FormFieldLabel label={translateLabels("hasInstantMatchingOn")} />
							</FormSwitchInput>
							<CashOutButton {...{ hasInstantMatchingOn }} />
							<SettingsSubmitButton {...{ isUserUpdating }} />
						</ScrollView> */}
			{/* </View> */}
			{/* </TouchableWithoutFeedback> */}
		</SafeAreaView>
		// </Formik>
	);
};

export default connector(SettingsPanel);
