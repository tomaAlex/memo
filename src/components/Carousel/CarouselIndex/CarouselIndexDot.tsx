import React from "react";
import { TouchableOpacity } from "react-native";
import { cx } from "utils/index";
import styles from "./CarouselIndex.module.scss";

type TProps = {
	active: boolean;
	width: number;
	onPress: () => void;
};

const CarouselIndexDot = ({ active, width, onPress }: TProps) => {
	return <TouchableOpacity {...{ onPress }} style={cx(styles.dot, [styles.dot__active, active], { width })} />;
};

export default React.memo(CarouselIndexDot);
