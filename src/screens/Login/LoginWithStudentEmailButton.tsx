import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationStackTypes, ScreenNames } from "types";
import styles from "./Login.module.scss";

const LoginWithStudentEmailButton = () => {
	const navigation = useNavigation<NavigationProp<NavigationStackTypes, ScreenNames>>();
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Login.StudentEmailLoginForm.Labels" });

	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate(ScreenNames.EmailLogin);
			}}
			style={styles.container__footer__signinButton}
		>
			{/* <View style={styles.container__footer__signinButton__circle} /> */}
			<View style={styles.container__footer__signinButton__captionContainer}>
				<Text style={styles.container__footer__signinButton__captionContainer__caption}>
					{translateLabels("submit")}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default React.memo(LoginWithStudentEmailButton);
