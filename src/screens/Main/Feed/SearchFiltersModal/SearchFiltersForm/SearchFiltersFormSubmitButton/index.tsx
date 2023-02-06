import React from "react";
import { Text } from "react-native";
import FormSubmitButton from "components/forms/FormSubmitButton";
import styles from "./SearchFiltersFormSubmitButton.module.scss";

const SearchFiltersFormSubmitButton = () => {
	return (
		<FormSubmitButton style={styles.container}>
			<Text style={styles.container__caption}>Apply</Text>
		</FormSubmitButton>
	);
};

export default React.memo(SearchFiltersFormSubmitButton);
