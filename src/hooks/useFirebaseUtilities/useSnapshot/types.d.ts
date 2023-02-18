import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type IdentifiedDataStructure<DataStructure extends FirebaseFirestoreTypes.DocumentData> = DataStructure & {
	id: string;
};
