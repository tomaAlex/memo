import React from "react";
import { TextProps, View } from "react-native";
import FormFieldLabel from "../FormFieldLabel";
import FormRangeSliderLabelBubble from "../FormRangeSlider/FormRangeSliderLabelBubble";
import styles from "./FormRangeSliderFieldLabel.module.scss";

type TProps = TextProps & {
	label: string;
	caption: string;
};

const FormRangeSliderFieldLabel = ({ label, caption, ...textProps }: TProps) => {
	return (
		<View style={styles.container}>
			<FormFieldLabel {...{ label, ...textProps }} />
			<FormRangeSliderLabelBubble {...{ caption }} />
		</View>
	);
};

export default React.memo(FormRangeSliderFieldLabel);
