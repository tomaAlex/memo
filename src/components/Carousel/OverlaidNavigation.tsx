import React from "react";
import { View } from "react-native";
import CarouselNavigationButton from "./CarouselNavigationButton";
import styles from "./Carousel.module.scss";

type TProps = {
	currentSlide: number;
	totalSlides: number;
	setCurrentSlide: (slide: number) => void;
};

const OverlaidNavigation = ({ currentSlide, totalSlides, setCurrentSlide }: TProps) => {
	return (
		<View style={styles.overlaidNavigationContainer}>
			<View style={styles.overlaidNavigationContainer__half}>
				{currentSlide > 0 && <CarouselNavigationButton navigate={() => setCurrentSlide(currentSlide - 1)} />}
			</View>
			<View style={styles.overlaidNavigationContainer__half}>
				{currentSlide < totalSlides - 1 && (
					<CarouselNavigationButton navigate={() => setCurrentSlide(currentSlide + 1)} />
				)}
			</View>
		</View>
	);
};

export default React.memo(OverlaidNavigation) as unknown as typeof OverlaidNavigation;
