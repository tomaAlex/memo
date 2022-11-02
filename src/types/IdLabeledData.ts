export type IdLabeledData<RawData = string> = {
	key: React.Key;
	label: string;
	value: RawData;
};
