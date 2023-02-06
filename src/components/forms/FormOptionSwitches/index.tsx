import React from "react";
import { View } from "react-native";
import FormOptionSwitchLabel from "./FormOptionSwitch/FormOptionSwitchLabel";
import styles from "./FormOptionSwitches.module.scss";

type TProps = {
	isMandatory?: boolean;
	formOptionSwitches: React.ReactElement[];
	children?: React.ReactNode;
};

const FormOptionSwitches = ({ isMandatory, formOptionSwitches, children }: TProps) => {
	return (
		<View style={styles.container}>
			<FormOptionSwitchLabel {...{ children, isMandatory }} />
			<View style={styles.container__switches}>{formOptionSwitches}</View>
		</View>
	);
};

export default React.memo(FormOptionSwitches);
