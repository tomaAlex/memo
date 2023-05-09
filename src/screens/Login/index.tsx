import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import auth from "@react-native-firebase/auth";
import connector from "../../redux/connector";
import { ScreenNames, ScreenProps } from "types/index";
import styles from "./Login.module.scss";
import { useSelector } from "react-redux";
import { selectAwaitingLoginStatus } from "redux/selectors";
import Loading from "components/Loading";
import LoginIcon from "./LoginIcon";
import BubbleNote from "./BubbleNote";
import LoginWithStudentEmailButton from "./LoginWithStudentEmailButton";

const Login = ({ setAwaitingLoginStatus }: ScreenProps<ScreenNames.Login>) => {
	const awaitingLoginStatus = useSelector(selectAwaitingLoginStatus);

	useEffect(() => {
		// execute this once only at the start
		if (!auth().currentUser && awaitingLoginStatus) {
			// if there is no auth user, then we are not logged in
			setAwaitingLoginStatus(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setAwaitingLoginStatus]);

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
