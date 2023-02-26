import React from "react";
import { Text, View } from "react-native";
import { cx } from "utils/index";
import RangeSlider from "rn-range-slider";
import styles from "./FormRangeSlider.module.scss";

type RangeSliderProps = React.ComponentProps<typeof RangeSlider>;
type TProps = {
	name: Parameters<RangeSliderProps["renderThumb"]>[0];
	value?: number;
};

const FormRangeSliderThumb = ({ name, value }: TProps) => {
	return (
		<View
			style={cx(
				styles.container__slider__control__thumb,
				[styles.container__slider__control__thumb__low, name === "low"],
				[styles.container__slider__control__thumb__high, name === "high"]
			)}
		>
			{value && <Text style={styles.container__slider__control__thumb__caption}>{value}</Text>}
		</View>
	);
};

export default React.memo(FormRangeSliderThumb);
