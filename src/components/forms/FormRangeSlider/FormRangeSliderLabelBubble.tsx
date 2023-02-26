import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./FormRangeSlider.module.scss";

type TProps = {
	caption: string;
};

const FormRangeSliderLabelBubble = ({ caption }: TProps) => {
	return (
		<TouchableOpacity style={styles.container__label__bubble}>
			<Text style={styles.container__label__bubble__caption}>{caption}</Text>
		</TouchableOpacity>
	);
};

export default React.memo(FormRangeSliderLabelBubble);
