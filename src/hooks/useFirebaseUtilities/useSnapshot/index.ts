import database, { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import { useState } from "react";

export const useSnapshot = <DataStructure = any>(
	collecctionId: string,
	documentPath?: string
): [DataStructure | null, FirebaseDatabaseTypes.Reference] => {
	const [data, setData] = useState<DataStructure | null>(null);
	const documentReference = database().ref(`/${collecctionId}/${documentPath}`);

	documentReference.on("value", (snapshot) => {
		setData(snapshot.val());
	});

	return [data, documentReference];
};
