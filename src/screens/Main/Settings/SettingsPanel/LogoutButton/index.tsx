import React from "react";
import { useTranslation } from "react-i18next";
import auth from "@react-native-firebase/auth";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./LogoutButton.module.scss";
import Loading from "components/Loading";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScreenNames, SettingsNavigationStackTypes, SettingsScreenNames } from "types/index";

const LogoutButton = () => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Settings" });
	const [isLoggingOut, setIsLoggingOut] = React.useState(false);
	const navigation = useNavigation<NavigationProp<SettingsNavigationStackTypes, SettingsScreenNames>>();

	if (isLoggingOut) {
		return (
			<View style={styles.loadingContainer}>
				<Loading />
			</View>
		);
	}

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={async () => {
				setIsLoggingOut(true);
				await auth().signOut();
				setIsLoggingOut(false);
				navigation.reset({
					index: 0,
					routes: [{ name: ScreenNames.Login }],
				});
			}}
		>
			<Text style={styles.container__text}>{t("logoutCaption")}</Text>
		</TouchableOpacity>
	);
};

export default React.memo(LogoutButton);
