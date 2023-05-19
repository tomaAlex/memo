import React, { useState } from "react";
import { Formik } from "formik";
import { useUserUpdateFormValidationRules } from "hooks";
import { updateUser as firebaseUpdateUser } from "Firebase/index";
import { Keyboard, SafeAreaView, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { useSelector } from "react-redux";
import connector from "redux/connector";
import UpdateEmbodimentForm from "../UpdateEmbodimentForm";
import SettingsSubmitButton from "../SettingsSubmitButton";
import { selectUser } from "redux/selectors";
import { ScreenProps, SettingsScreenNames, User } from "types/index";
import styles from "./SettingsPhotos.module.scss";

const SettingsPhotos = ({}: ScreenProps<SettingsScreenNames.Photos>) => {
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
					<View style={styles.container__formContainer}>
						{/* <ScrollView style={styles.container__formContainer__form}> */}
						<UpdateEmbodimentForm />
						<SettingsSubmitButton {...{ isUserUpdating }} />
						{/* </ScrollView> */}
					</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		</Formik>
	);
};

export default connector(SettingsPhotos);
