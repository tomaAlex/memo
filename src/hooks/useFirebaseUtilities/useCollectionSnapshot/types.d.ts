import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type DynamicFirebaseSnapshot<DataStructure extends FirebaseFirestoreTypes.DocumentData> = [
	DataStructure,
	FirebaseFirestoreTypes.DocumentReference<DataStructure>
];

export type FirebaseCollectionIterator<DataStructure extends FirebaseFirestoreTypes.DocumentData> = {
	previous: () => void;
	next: () => void;
	current: () => DynamicFirebaseSnapshot<DataStructure> | null;
	hasPrevious: () => boolean;
	hasNext: () => boolean;
	reset: () => void;
};
