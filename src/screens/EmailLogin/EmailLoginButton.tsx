import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import FormSubmitButton from "components/forms/FormSubmitButton";
import styles from "screens/Login/Login.module.scss";

const EmailLoginButton = () => {
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Login.StudentEmailLoginForm.Labels" });

	return (
		<FormSubmitButton style={styles.container__footer__signinButton}>
			{/* <View style={styles.container__footer__signinButton__circle} /> */}
			<View style={styles.container__footer__signinButton__captionContainer}>
				<Text style={styles.container__footer__signinButton__captionContainer__caption}>
					{translateLabels("submit")}
				</Text>
			</View>
		</FormSubmitButton>
	);
};

export default React.memo(EmailLoginButton);
