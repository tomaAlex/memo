import { useNavigation } from "@react-navigation/native";
import Loading from "components/Loading";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingsNavigationStackTypes, SettingsScreenNames } from "types/index";
import styles from "./DeleteAccountButton.module.scss";
import { getDeletionConfirmation } from "./utils";

const DeleteAccountButton = () => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Settings.DeleteAccountButton" });
	const [isDeletingAccount, setIsDeletingAccount] = useState(false);
	const navigation =
		useNavigation<NativeStackNavigationProp<SettingsNavigationStackTypes, SettingsScreenNames.Preferences>>();

	if (isDeletingAccount) {
		return (
			<View style={styles.loadingContainer}>
				<Loading />
			</View>
		);
	}

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				getDeletionConfirmation(t, setIsDeletingAccount, navigation);
			}}
		>
			<Text style={styles.container__caption}>{t("caption")}</Text>
		</TouchableOpacity>
	);
};

export default React.memo(DeleteAccountButton);
