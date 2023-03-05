import React, { useRef } from "react";
import { Formik } from "formik";
import { Keyboard, SafeAreaView, View, TouchableWithoutFeedback } from "react-native";
import connector from "../../redux/connector";
import auth from "@react-native-firebase/auth";
import { ScreenNames, ScreenProps } from "types/index";
import styles from "./EmailLogin.module.scss";
import { useSelector } from "react-redux";
import { selectAwaitingLoginStatus } from "redux/selectors";
import Loading from "components/Loading";
import { useTranslation } from "react-i18next";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { useLoginWithStudentEmailFormValidationRules } from "hooks/useFormValidationRules/useLoginWithStudentEmailFormValidationRules";
import FormTextInput from "components/forms/FormTextInput";
import FormFieldLabel from "components/forms/FormFieldLabel";
import EmailLoginButton from "./EmailLoginButton";
import { getDynamicLinkHandler } from "./utils";

const EmailLogin = ({ setAwaitingLoginStatus }: ScreenProps<ScreenNames.EmailLogin>) => {
	const awaitingLoginStatus = useSelector(selectAwaitingLoginStatus);
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Login.StudentEmailLoginForm.Labels" });
	const [translateErrors] = useTranslation("translation", { keyPrefix: "Screens.Login.StudentEmailLoginForm.Errors" });
	const loginWithStudentEmailFormValidationSchema = useLoginWithStudentEmailFormValidationRules();
	const dynamicLinkUnsubscribe = useRef<() => void>();

	const unsubscribeFromPriorDynamicLink = () => {
		if (!dynamicLinkUnsubscribe.current) {
			return;
		}
		dynamicLinkUnsubscribe.current();
	};

	if (awaitingLoginStatus) {
		return (
			<View style={styles.loadingContainer}>
				<Loading />
			</View>
		);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.container}>
				<Formik
					validationSchema={loginWithStudentEmailFormValidationSchema}
					initialValues={{
						email: "",
					}}
					onSubmit={async ({ email }, { setErrors }) => {
						unsubscribeFromPriorDynamicLink();
						const handleDynamicLink = getDynamicLinkHandler(email);
						dynamicLinkUnsubscribe.current = dynamicLinks().onLink(handleDynamicLink);
						setAwaitingLoginStatus(true);
						try {
							await auth().sendSignInLinkToEmail(email, {
								android: { packageName: "com.obsid.memo" },
								handleCodeInApp: true,
								iOS: { bundleId: "com.memo.memo.ios" },
								url: "https://obsid.page.link",
							});
						} catch (error) {
							console.log(error);
							setAwaitingLoginStatus(false);
							setErrors({ email: translateErrors("email.invalid") });
						}
					}}
				>
					<View style={styles.container__form}>
						<FormTextInput isMandatory field="email">
							<FormFieldLabel label={translateLabels("email")} />
						</FormTextInput>
						<EmailLoginButton />
					</View>
				</Formik>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default connector(EmailLogin);
