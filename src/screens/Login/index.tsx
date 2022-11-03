import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import connector from "../../redux/connector";
import { useTranslation } from "react-i18next";
import "../../translations/i18.config";
import { ScreenNames, ScreenProps } from "types/index";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { signInWithGoogle, signInWithFacebook } from "Firebase/index";
import { LoginButton } from "react-native-fbsdk-next";
import handleSignIn from "./utils/handleSignIn";

const Login = ({ navigation }: ScreenProps<ScreenNames.Login>) => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Login" });

	return (
		<SafeAreaView style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
			<GoogleSigninButton size={1} onPress={handleSignIn(signInWithGoogle, navigation)} />
			<TouchableOpacity onPress={handleSignIn(signInWithFacebook, navigation)}>
				<LoginButton
					style={{ width: 304, height: 36 }}
					onLogoutFinished={() => console.log("logged out")}
				></LoginButton>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default connector(Login);
