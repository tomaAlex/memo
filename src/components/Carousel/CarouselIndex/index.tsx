import React from "react";
import { Dimensions, View } from "react-native";
import { cx } from "utils/index";
import CarouselIndexDot from "./CarouselIndexDot";
import styles from "./CarouselIndex.module.scss";

type TProps = {
	currentSlide: number;
	totalSlides: number;
	setCurrentSlide: (slide: number) => void;
};

const CarouselIndex = ({ currentSlide, totalSlides, setCurrentSlide }: TProps) => {
	const screenWidth = Dimensions.get("window").width;
	const dotWidth = screenWidth / 25;
	const containerOverflowPercentage = 1.5;
	const containerWidth = totalSlides * dotWidth * containerOverflowPercentage;
	const marginLeft = (screenWidth - containerWidth) / 2;

	return (
		<View style={cx(styles.container, { width: containerWidth, marginLeft })}>
			{Array.from({ length: totalSlides }, (_, i) => (
				<CarouselIndexDot key={i} width={dotWidth} active={i === currentSlide} onPress={() => setCurrentSlide(i)} />
			))}
		</View>
	);
};

export default React.memo(CarouselIndex);
