import React from "react";
import { Text } from "react-native";

type TProps = {
	label: string;
};

const FormFieldLabel = ({ label }: TProps) => {
	return <Text>{label}:</Text>;
};

export default React.memo(FormFieldLabel) as unknown as typeof FormFieldLabel;
