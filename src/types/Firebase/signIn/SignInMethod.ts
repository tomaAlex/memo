import { UserCredential } from "@firebase/auth";

export type SignInMethod = () => Promise<UserCredential>;
