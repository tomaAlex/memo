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

const Settings = ({
	user: { firstName, lastName, gender, birthDate, job, school, description, location, height, orientation, photos, id },
}: ScreenProps<MainScreenNames.Settings>) => {
	const userUpdateSchema = useUserUpdateFormValidationRules();
	const locationCountry = location?.country;
	const locationState = location?.state;
	const locationCity = location?.city;
	const [isUserUpdating, setIsUserUpdating] = useState(false);

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
							<SettingsSubmitButton {...{ isUserUpdating }} />
						</ScrollView>
					</Formik>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default connector(Settings);
