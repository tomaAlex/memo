import React, { useState } from "react";
import { Formik } from "formik";
import { useUserUpdateFormValidationRules } from "hooks";
import { updateUser as firebaseUpdateUser } from "Firebase/index";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { useSelector } from "react-redux";
import connector from "redux/connector";
import UpdateDetailsForm from "../UpdateDetailsForm";
import UpdateIdentificationForm from "../UpdateIdentificationForm";
import SettingsSubmitButton from "../SettingsSubmitButton";
import { selectUser } from "redux/selectors";
import { ScreenProps, SettingsScreenNames, User } from "types/index";
import styles from "./SettingsInformation.module.scss";

const SettingsInformation = ({}: ScreenProps<SettingsScreenNames.Information>) => {
	const userUpdateSchema = useUserUpdateFormValidationRules();
	const user = useSelector(selectUser);
	const { location, id } = user;
	const locationCountry = location?.country;
	const locationState = location?.state;
	const locationCity = location?.city;
	const [isUserUpdating, setIsUserUpdating] = useState(false);

	return (
		<Formik
			validationSchema={userUpdateSchema}
			initialValues={{ ...user, locationCountry, locationState, locationCity }}
			onSubmit={async (userUpdate) => {
				setIsUserUpdating(true);
				await firebaseUpdateUser(user, userUpdate as unknown as User, id);
				setIsUserUpdating(false);
			}}
		>
			<SafeAreaView style={styles.container}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={{ flex: 1 }}
						keyboardVerticalOffset={140}
					>
						<View style={styles.container__formContainer}>
							<ScrollView style={styles.container__formContainer__form} showsVerticalScrollIndicator={false}>
								<UpdateIdentificationForm />
								<UpdateDetailsForm />
								<SettingsSubmitButton {...{ isUserUpdating }} />
							</ScrollView>
						</View>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		</Formik>
	);
};

export default connector(SettingsInformation);
