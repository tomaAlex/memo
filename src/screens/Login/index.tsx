import React from "react";
import { Keyboard, SafeAreaView, View, TouchableWithoutFeedback } from "react-native";
import connector from "../../redux/connector";
import { ScreenNames, ScreenProps } from "types/index";
import styles from "./Login.module.scss";
import { useSelector } from "react-redux";
import { selectAwaitingLoginStatus } from "redux/selectors";
import Loading from "components/Loading";
import LoginIcon from "./LoginIcon";
import BubbleNote from "./BubbleNote";
import LoginWithStudentEmailSection from "./LoginWithStudentEmailSection";

const Login = ({ setAwaitingLoginStatus }: ScreenProps<ScreenNames.Login>) => {
	const awaitingLoginStatus = useSelector(selectAwaitingLoginStatus);

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
				<View style={styles.container__header}>
					<LoginIcon style={styles.container__header__icon} />
				</View>
				<View style={styles.container__body}>
					<BubbleNote />
				</View>
				<View style={styles.container__footer}>
					<LoginWithStudentEmailSection {...{ setAwaitingLoginStatus }} />
					{/* <Text style={styles.container__footer__note}>{t("note")} 🙏</Text> */}
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default connector(Login);
