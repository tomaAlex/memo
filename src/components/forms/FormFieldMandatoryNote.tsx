import React from "react";
import { Text } from "react-native";

const FormFieldMandatoryNote = () => {
	return <Text style={{ color: "red", alignSelf: "center" }}>*</Text>;
};

export default React.memo(FormFieldMandatoryNote) as unknown as typeof FormFieldMandatoryNote;
