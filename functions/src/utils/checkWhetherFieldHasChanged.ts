import { firestore } from "firebase-admin";

export const checkWhetherFieldHasChanged = <DocumentStructure extends firestore.DocumentData>(
	beforeChangeFileData: DocumentStructure,
	afterChangeFileData: DocumentStructure,
	fieldToCheck: keyof DocumentStructure
) => {
	const beforeChangeFileFieldValue = JSON.stringify(beforeChangeFileData[fieldToCheck]);
	const afterChangeFileFieldValue = JSON.stringify(afterChangeFileData[fieldToCheck]);
	const areFieldsTheSame = beforeChangeFileFieldValue == afterChangeFileFieldValue;
	return !areFieldsTheSame;
};
