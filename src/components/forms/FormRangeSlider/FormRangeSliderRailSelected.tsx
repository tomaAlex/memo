import React from "react";
import { View } from "react-native";
import styles from "./FormRangeSlider.module.scss";

const FormRangeSliderRailSelected = () => {
	return <View style={styles.container__slider__control__railSelected} />;
};

export default React.memo(FormRangeSliderRailSelected);
