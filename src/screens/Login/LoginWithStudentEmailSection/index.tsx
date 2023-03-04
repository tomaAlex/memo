import React, { useRef } from "react";
import { Formik } from "formik";
import { View } from "react-native";
import { ReduxProps } from "types/index";
import auth from "@react-native-firebase/auth";
import { useTranslation } from "react-i18next";
import { getDynamicLinkHandler } from "./utils";
import FormTextInput from "components/forms/FormTextInput";
import FormFieldLabel from "components/forms/FormFieldLabel";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import styles from "./LoginWithStudentEmailSection.module.scss";
import LoginWithStudentEmailSectionSubmitButton from "./LoginWithStudentEmailSectionSubmitButton";
import { useLoginWithStudentEmailFormValidationRules } from "hooks/useFormValidationRules/useLoginWithStudentEmailFormValidationRules";

type TProps = {
	setAwaitingLoginStatus: ReduxProps["setAwaitingLoginStatus"];
};

const LoginWithStudentEmailSection = ({ setAwaitingLoginStatus }: TProps) => {
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

	return (
		<View style={styles.container}>
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
					<LoginWithStudentEmailSectionSubmitButton />
				</View>
			</Formik>
		</View>
	);
};

export default React.memo(LoginWithStudentEmailSection);
