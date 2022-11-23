import React from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { StyleProp, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import { cx } from "utils/index";

function FormSubmitButton<D>({ children, ...touchableOpacityProps }: TouchableOpacityProps) {
	const [t] = useTranslation();
	const { handleSubmit } = useFormikContext<D>();
	const possibleStyle = {
		alignSelf: "center",
		backgroundColor: "#C5C5C5",
		padding: 10,
		borderRadius: 10,
	} as StyleProp<ViewStyle>;
	const hasChildren = !!children;
	return (
		<TouchableOpacity
			style={cx([possibleStyle, !hasChildren]) as StyleProp<ViewStyle>}
			onPress={handleSubmit}
			{...touchableOpacityProps}
		>
			{children ? children : <Text>{t("Screens.Signup.Forms.Labels.submit")}</Text>}
		</TouchableOpacity>
	);
}

export default React.memo(FormSubmitButton) as unknown as typeof FormSubmitButton;
