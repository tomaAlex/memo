import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import connector from "../../redux/connector";
import { useTranslation } from "react-i18next";
import "../../translations/i18.config";
import { ScreenNames, ScreenProps } from "types/index";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { signInWithGoogle } from "Firebase/index";
// import { signInWithGoogle, signInWithFacebook } from "Firebase/index";
// import { LoginButton } from "react-native-fbsdk-next";
// import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import firestore from "@react-native-firebase/firestore";
import MatchMessagePreview from "screens/MatchChat/MatchMessages/MatchMessagePreview";
import styles from "./Login.module.scss";
import { useSelector } from "react-redux";
import { selectAwaitingLoginStatus } from "redux/selectors";
import Loading from "components/Loading";

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
				<Text style={styles.container__header__title}>{t("title")}</Text>
				<View style={styles.container__header__abstract}>
					<MatchMessagePreview
						seenBy={[]}
						author="memo"
						content={`${t("abstract")} 🙂`}
						timestamp={firestore.Timestamp.now()}
						matchedUsers={[]}
					/>
				</View>
			</View>
			<GoogleSigninButton
				style={styles.container__signinButton}
				size={1}
				onPress={() => {
					signInWithGoogle(setAwaitingLoginStatus);
				}}
			/>
			<View style={styles.container__footer}>
				<Text style={styles.container__footer__note}>{t("note")} 🙏</Text>
			</View>
			{/* <TouchableOpacity onPress={signInWithFacebook}>
				<LoginButton style={{ width: 304, height: 36 }} onLogoutFinished={() => console.log("logged out")} />
			</TouchableOpacity> */}
		</SafeAreaView>
	);
};

export default connector(Login);
