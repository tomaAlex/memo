import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import connector from "../../redux/connector";
import { useTranslation } from "react-i18next";
import "../../translations/i18.config";
import { ScreenNames, ScreenProps } from "types/index";
import styles from "./Login.module.scss";
import { useSelector } from "react-redux";
import { selectAwaitingLoginStatus } from "redux/selectors";
import Loading from "components/Loading";
import LoginIcon from "./LoginIcon";
import { signInWithGoogle } from "Firebase/index";
import BubbleNote from "./BubbleNote";

const Login = ({ setAwaitingLoginStatus }: ScreenProps<ScreenNames.Login>) => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Login" });
	const awaitingLoginStatus = useSelector(selectAwaitingLoginStatus);

	if (awaitingLoginStatus) {
		return (
			<View style={styles.loadingContainer}>
				<Loading />
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container__header}>
				<LoginIcon style={styles.container__header__icon} />
				<BubbleNote />
			</View>
			<View style={styles.container__body}>
				<TouchableOpacity
					style={styles.container__body__signinButton}
					onPress={() => {
						signInWithGoogle(setAwaitingLoginStatus);
					}}
				>
					<View style={styles.container__body__signinButton__circle} />
					<View style={styles.container__body__signinButton__captionContainer}>
						<Text style={styles.container__body__signinButton__captionContainer__caption}>
							{t("googleLoginButton")}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.container__footer}>
				{/* <Text style={styles.container__footer__note}>{t("note")} 🙏</Text> */}
			</View>
		</SafeAreaView>
	);
};

export default connector(Login);
