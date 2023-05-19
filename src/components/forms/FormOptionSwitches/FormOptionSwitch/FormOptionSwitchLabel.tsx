import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import FormFieldMandatoryNote from "../../FormFieldMandatoryNote";
import styles from "./FormOptionSwitch.module.scss";

type TProps = {
	children?: React.ReactNode;
	isMandatory?: boolean;
	labelStyle?: StyleProp<ViewStyle>;
};

const FormOptionSwitchLabel = ({ children, isMandatory, labelStyle }: TProps) => {
	return children ? (
		<View style={[styles.container__label, labelStyle]}>
			{isMandatory && (
				<View style={styles.container__label__mandatoryNote}>
					<FormFieldMandatoryNote />
				</View>
			)}
			{children}
		</View>
	) : null;
};

export default React.memo(FormOptionSwitchLabel);
