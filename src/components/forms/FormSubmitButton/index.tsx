import React from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { StyleProp, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import { cx } from "utils/index";
import styles from "./FormSubmitButton.module.scss";

function FormSubmitButton<D>({ children, ...touchableOpacityProps }: TouchableOpacityProps) {
	const [t] = useTranslation();
	const { handleSubmit } = useFormikContext<D>();
	const hasChildren = !!children;
	return (
		<TouchableOpacity
			style={cx([styles.container, !hasChildren]) as StyleProp<ViewStyle>}
			onPress={handleSubmit}
			{...touchableOpacityProps}
		>
			{children ? children : <Text style={styles.container__text}>{t("Screens.Signup.Forms.Labels.submit")}</Text>}
		</TouchableOpacity>
	);
}

export default React.memo(FormSubmitButton) as unknown as typeof FormSubmitButton;
