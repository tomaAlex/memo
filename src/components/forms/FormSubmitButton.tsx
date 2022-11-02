import React from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";

function FormSubmitButton<D>() {
	const [t] = useTranslation();
	const { handleSubmit } = useFormikContext<D>();
	return (
		<TouchableOpacity
			style={{ alignSelf: "center", backgroundColor: "#C5C5C5", padding: 10, borderRadius: 10 }}
			onPress={handleSubmit}
		>
			<Text>{t("Screens.Signup.Forms.Labels.submit")}</Text>
		</TouchableOpacity>
	);
}

export default React.memo(FormSubmitButton) as unknown as typeof FormSubmitButton;
