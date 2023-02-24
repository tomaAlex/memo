import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ReduxProps } from "types/redux";

export type SignInMethod = (
	setAwaitingLoginStatus: ReduxProps["setAwaitingLoginStatus"]
) => Promise<FirebaseAuthTypes.UserCredential>;
