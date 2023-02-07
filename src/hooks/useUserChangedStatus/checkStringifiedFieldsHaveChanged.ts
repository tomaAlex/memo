const checkStringifiedFieldsHaveChanged = <T>(currentFieldValue: T, possiblyChangedFieldValue: T): boolean => {
	return JSON.stringify(currentFieldValue) !== JSON.stringify(possiblyChangedFieldValue);
};

export default checkStringifiedFieldsHaveChanged;
