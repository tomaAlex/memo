import React from "react";
import { ReduxProps } from "types/index";
import { useTranslation } from "react-i18next";
import { signInWithGoogle } from "Firebase/index";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./Login.module.scss";

type TProps = {
	setAwaitingLoginStatus: ReduxProps["setAwaitingLoginStatus"];
};

const LoginWithGoogleButton = ({ setAwaitingLoginStatus }: TProps) => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Login" });

	return (
		<TouchableOpacity
			style={styles.container__footer__signinButton}
			onPress={() => {
				signInWithGoogle(setAwaitingLoginStatus);
			}}
		>
			<View style={styles.container__footer__signinButton__circle} />
			<View style={styles.container__footer__signinButton__captionContainer}>
				<Text style={styles.container__footer__signinButton__captionContainer__caption}>{t("googleLoginButton")}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default React.memo(LoginWithGoogleButton);
