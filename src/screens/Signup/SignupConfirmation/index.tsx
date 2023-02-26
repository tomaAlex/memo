import Loading from "components/Loading";
import { LadyIcon } from "icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, View } from "react-native";
import connector from "redux/connector";
import { ScreenNames, ScreenProps } from "types";
import Button from "./Button";
import styles from "./SignupConfirmation.module.scss";

const SignupConfirmation = ({ navigation, user }: ScreenProps<ScreenNames.SignupConfirmation>) => {
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup" });
	const [isLoading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		if (!user) {
			return;
		}
		setLoading(false);
	}, [user]);
	return (
		<SafeAreaView style={styles.container}>
			<LadyIcon height={500} width={300} style={styles.container__user} />
			<Text style={styles.container__profileNote}>{translateLabels("confirmation")}</Text>
			<Text style={styles.container__matchNote}>{translateLabels("matchReady")}</Text>
			{!isLoading ? (
				<Button
					onPress={() => {
						navigation.replace(ScreenNames.Main, { uid: user.id });
					}}
				/>
			) : (
				<View style={styles.container__loading}>
					<Loading />
				</View>
			)}
		</SafeAreaView>
	);
};

export default connector(SignupConfirmation);
