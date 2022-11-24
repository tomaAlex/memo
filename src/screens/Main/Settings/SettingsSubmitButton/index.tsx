import React from "react";
import { Text } from "react-native";
import FormSubmitButton from "components/forms/FormSubmitButton";
import styles from "./SettingsSubmitButton.module.scss";

type TProps = {
	isUserUpdating: boolean;
};

const SettingsSubmitButton = ({ isUserUpdating }: TProps) => {
	return (
		<FormSubmitButton style={styles.container} disabled={isUserUpdating}>
			<Text style={styles.container__caption}>Update</Text>
		</FormSubmitButton>
	);
};

export default React.memo(SettingsSubmitButton);
