import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { IdentifiedDataStructure } from "./types";

export const useSnapshot = <
	DataStructure extends FirebaseFirestoreTypes.DocumentData = FirebaseFirestoreTypes.DocumentData
>(
	collectionId: string,
	documentPath?: string
): [
	data: IdentifiedDataStructure<DataStructure> | null,
	documentReference: FirebaseFirestoreTypes.DocumentReference<DataStructure>
] => {
	const [data, setData] = useState<IdentifiedDataStructure<DataStructure> | null>(null);

	const documentReference = firestore()
		.collection(collectionId)
		.doc(documentPath) as FirebaseFirestoreTypes.DocumentReference<DataStructure>;

	const stopListeningToSnapshot = documentReference.onSnapshot((snapshot) => {
		if (!snapshot || !snapshot.exists) {
			setData(null);
			return;
		}
		const updatedData = snapshot.data() as DataStructure;
		const identifiedUpdatedData = { ...updatedData, id: snapshot.id };
		const didDataUpdate = JSON.stringify(identifiedUpdatedData) !== JSON.stringify(data);
		if (!didDataUpdate) {
			return;
		}
		const unidentifiedData = snapshot.data() as DataStructure;
		setData(identifiedUpdatedData);
	});

	useEffect(() => stopListeningToSnapshot, [stopListeningToSnapshot]);

	return [data, documentReference];
};
