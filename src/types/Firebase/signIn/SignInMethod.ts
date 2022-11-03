import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type SignInMethod = () => Promise<FirebaseAuthTypes.UserCredential>;
