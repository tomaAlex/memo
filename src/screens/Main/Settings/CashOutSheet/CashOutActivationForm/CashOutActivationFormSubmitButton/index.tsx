import React from "react";
import { View } from "react-native";
import Loading from "components/Loading";
import FormSubmitButton from "components/forms/FormSubmitButton";
import styles from "./CashOutActivationFormSubmitButton.module.scss";
import { useFormikContext } from "formik";

type TProps = {
	isActivating: boolean;
};

const CashOutActivationFormSubmitButton = ({ isActivating }: TProps) => {
	const { errors } = useFormikContext();
	const hasErrors = Object.keys(errors).length > 0;

	return isActivating ? (
		<View style={styles.loadingContainer}>
			<Loading />
		</View>
	) : (
		<FormSubmitButton disabled={hasErrors} />
	);
};

export default React.memo(CashOutActivationFormSubmitButton);
