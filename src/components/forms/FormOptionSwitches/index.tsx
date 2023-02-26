import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import FormOptionSwitchLabel from "./FormOptionSwitch/FormOptionSwitchLabel";
import styles from "./FormOptionSwitches.module.scss";

type TProps = {
	isMandatory?: boolean;
	formOptionSwitches: React.ReactElement[];
	children?: React.ReactNode;
	customErrorDisplay?: React.ReactNode;
	customSwitchContainerStyle?: StyleProp<ViewStyle>;
};

const FormOptionSwitches = ({
	isMandatory,
	formOptionSwitches,
	children,
	customErrorDisplay,
	customSwitchContainerStyle = styles.container__switches,
}: TProps) => {
	return (
		<View style={styles.container}>
			<FormOptionSwitchLabel {...{ children, isMandatory }} />
			<View style={customSwitchContainerStyle}>{formOptionSwitches}</View>
			{customErrorDisplay}
		</View>
	);
};

export default React.memo(FormOptionSwitches);
