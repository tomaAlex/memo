import { firestore } from "firebase-admin";
import { checkWhetherFieldHasChanged } from "./checkWhetherFieldHasChanged";

export const checkWhetherFieldsHaveChanged = <DocumentStructure extends firestore.DocumentData>(
	beforeChangeFileData: DocumentStructure,
	afterChangeFileData: DocumentStructure,
	fieldsToCheckForChange: Array<keyof DocumentStructure>
) => {
	for (const field of fieldsToCheckForChange) {
		if (!checkWhetherFieldHasChanged(beforeChangeFileData, afterChangeFileData, field)) {
			return false;
		}
	}
	return true;
};
