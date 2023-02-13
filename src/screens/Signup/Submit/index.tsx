import FormSubmitButton from "components/forms/FormSubmitButton";
import React from "react";
import { Text, ViewStyle, View } from "react-native";
import styles from "./Submit.module.scss";

type TProps = {
	spacing: ViewStyle["marginTop"];
};

const Submit = ({ spacing }: TProps) => {
	return (
		<View style={[styles.__buttonContainer, { marginTop: spacing }]}>
			<FormSubmitButton style={styles.buttonContainer__buttonDimensions}>
				<Text style={styles.buttonContainer__buttonText}>Continue</Text>
			</FormSubmitButton>
		</View>
	);
};

export default React.memo(Submit) as unknown as typeof Submit;
