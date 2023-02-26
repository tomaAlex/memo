import React from "react";
import { View } from "react-native";
import styles from "./FormRangeSlider.module.scss";

const FormRangeSliderRail = () => {
	return <View style={styles.container__slider__control__rail} />;
};

export default React.memo(FormRangeSliderRail);
