import React from "react";
import { SafeAreaView, View } from "react-native";
import connector from "../../redux/connector";
import { ScreenNames, ScreenProps } from "types/index";
import styles from "./Login.module.scss";
import { useSelector } from "react-redux";
import { selectAwaitingLoginStatus } from "redux/selectors";
import Loading from "components/Loading";
import LoginIcon from "./LoginIcon";
import BubbleNote from "./BubbleNote";
import LoginWithStudentEmailButton from "./LoginWithStudentEmailButton";

// const Login = ({ setAwaitingLoginStatus }: ScreenProps<ScreenNames.Login>) => {
const Login = ({}: ScreenProps<ScreenNames.Login>) => {
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
			</View>
			<View style={styles.container__body}>
				<BubbleNote />
			</View>
			<View style={styles.container__footer}>
				<LoginWithStudentEmailButton />
			</View>
		</SafeAreaView>
	);
};

export default connector(Login);
