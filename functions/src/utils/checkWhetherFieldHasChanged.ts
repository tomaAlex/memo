import { firestore } from "firebase-admin";

export const checkWhetherFieldHasChanged = <DocumentStructure extends firestore.DocumentData>(
	beforeChangeFileData: DocumentStructure,
	afterChangeFileData: DocumentStructure,
	fieldToCheck: keyof DocumentStructure
) => {
	return beforeChangeFileData[fieldToCheck] !== afterChangeFileData[fieldToCheck];
};
