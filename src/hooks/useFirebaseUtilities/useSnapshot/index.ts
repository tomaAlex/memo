import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export const useSnapshot = <
	DataStructure extends FirebaseFirestoreTypes.DocumentData = FirebaseFirestoreTypes.DocumentData
>(
	collecctionId: string,
	documentPath?: string
): [DataStructure | null, FirebaseFirestoreTypes.DocumentReference<DataStructure>] => {
	const [data, setData] = useState<DataStructure | null>(null);

	const documentReference = firestore()
		.collection(collecctionId)
		.doc(documentPath) as FirebaseFirestoreTypes.DocumentReference<DataStructure>;

	const stopListeningToSnapshot = documentReference.onSnapshot((snapshot) => {
		const updatedData = snapshot.data() as DataStructure;
		const didDataUpdate = JSON.stringify(updatedData) !== JSON.stringify(data);
		if (!didDataUpdate) {
			return;
		}
		setData(snapshot.data() as DataStructure);
	});

	useEffect(() => stopListeningToSnapshot, [stopListeningToSnapshot]);

	return [data, documentReference];
};