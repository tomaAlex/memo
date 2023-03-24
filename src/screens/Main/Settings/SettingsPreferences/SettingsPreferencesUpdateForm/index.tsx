import React, { useState } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useUserUpdateFormValidationRules } from "hooks";
import { updateUser as firebaseUpdateUser } from "Firebase/index";
import { Keyboard, SafeAreaView, TouchableWithoutFeedback, View } from "react-native";
import { useSelector } from "react-redux";
import SettingsSubmitButton from "../../SettingsSubmitButton";
import { selectUser } from "redux/selectors";
import { User } from "types/index";
import styles from "./SettingsPreferencesUpdateForm.module.scss";
import FormSwitchInput from "components/forms/FormSwitchInput";
import FormFieldLabel from "components/forms/FormFieldLabel";
import CashOutButton from "../../CashOutButton";
import DeleteAccountButton from "../../DeleteAccountButton";

const SettingsPreferencesUpdateForm = () => {
	const userUpdateSchema = useUserUpdateFormValidationRules();
	const user = useSelector(selectUser);
	const { location, id, hasInstantMatchingOn } = user;
	const locationCountry = location?.country;
	const locationState = location?.state;
	const locationCity = location?.city;
	const [isUserUpdating, setIsUserUpdating] = useState(false);
	const [isBalanceLoading, setIsBalanceLoading] = useState(true);
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Main.Settings.Labels" });

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
						{/* <View style={styles.container__formContainer__form}>
							<FormSwitchInput
								isMandatory
								field="hasInstantMatchingOn"
								trackColor={{ true: "#0000A7" }}
								style={styles.container__formContainer__form__switcher}
							>
								<FormFieldLabel label={translateLabels("hasInstantMatchingOn")} />
							</FormSwitchInput>
							<SettingsSubmitButton {...{ isUserUpdating }} />
						</View> */}
						{/* <CashOutButton {...{ hasInstantMatchingOn, isBalanceLoading, setIsBalanceLoading }} /> */}
						{/* {!isBalanceLoading && <DeleteAccountButton />} */}
						<DeleteAccountButton />
					</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		</Formik>
	);
};

export default React.memo(SettingsPreferencesUpdateForm);
