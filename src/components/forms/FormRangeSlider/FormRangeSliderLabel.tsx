import React from "react";
import { View } from "react-native";
import FormFieldMandatoryNote from "../FormFieldMandatoryNote";
import styles from "./FormRangeSlider.module.scss";

type TProps = {
	children?: React.ReactNode;
	isMandatory?: boolean;
};

const FormRangeSliderLabel = ({ children, isMandatory }: TProps) => {
	return children ? (
		<View style={styles.container__label}>
			{isMandatory && (
				<View style={styles.container__label__mandatoryNote}>
					<FormFieldMandatoryNote />
				</View>
			)}
			{children}
		</View>
	) : null;
};

export default React.memo(FormRangeSliderLabel);
