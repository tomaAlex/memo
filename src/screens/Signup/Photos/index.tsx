import FormImagePicker from "components/forms/FormImagePicker";
import Loading from "components/Loading";
import { Formik } from "formik";
import { useNetInfo } from "@react-native-community/netinfo";
import { useSignupPhotosFormValidationRules } from "hooks/useFormValidationRules/useSignupPhotosFormValidationRules";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, View } from "react-native";
import connector from "redux/connector";
import { PhotoForm, ScreenNames, ScreenProps } from "types";
import createUser from "../CreateUser/createUser";
import auth from "@react-native-firebase/auth";
import Header from "../Header";
import Label from "../Label";
import Submit from "../Submit";
import styles from "./Photos.module.scss";
import storeUser from "../CreateUser/storeUser";

const Photos = ({ navigation, route, updateUser }: ScreenProps<ScreenNames.Photos>) => {
	const { stepNumber, descriptionForm } = route.params;
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Embodiment.Labels" });
	const [translateErrors] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Embodiment.Errors" });
	const [isCreatingAccount, setIsCreatingAccount] = useState(false);
	const photosSchema = useSignupPhotosFormValidationRules();
	const { isConnected } = useNetInfo();

	if (isConnected === null) {
		// We don't know if the user is connected to the internet, so we wait for the answer
		return (
			<View style={styles.loadingContainer}>
				<Loading />
			</View>
		);
	}

	if (!isConnected) {
		// The user is not connected to the internet, so we display a clear error message
		return (
			<View style={styles.loadingContainer}>
				<Text style={styles.error}>{translateErrors("noInternet")}</Text>
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Header navigation={navigation} stepNo={stepNumber} />
			<View style={styles.container__form}>
				<Formik
					validationSchema={photosSchema}
					initialValues={{ photos: [] as string[] }}
					onSubmit={async (values, { setErrors }) => {
						const userForm: PhotoForm = { ...values, ...descriptionForm };
						setIsCreatingAccount(true);
						try {
							const userToSignUp = await createUser(userForm);
							const createdUserId = auth().currentUser?.uid as string;
							await storeUser(userToSignUp, createdUserId, updateUser);
							navigation.reset({
								index: 0,
								routes: [{ name: ScreenNames.SignupConfirmation }],
							});
						} catch (err) {
							setErrors({ photos: translateErrors("failedSignup") });
						} finally {
							setIsCreatingAccount(false);
						}
					}}
				>
					<>
						<Label label={translateLabels("photos")} isMandatory={true} fieldName={"photos"} />
						<Text style={styles.container__photosNote}>{translateLabels("photosNote")}</Text>
						<View style={styles.container__photos}>
							<FormImagePicker field={"photos"} />
						</View>
						{isCreatingAccount ? (
							<View style={styles.container__loading}>
								<Loading />
							</View>
						) : (
							<Submit spacing={"30%"} />
						)}
					</>
				</Formik>
			</View>
		</SafeAreaView>
	);
};

export default connector(Photos);
