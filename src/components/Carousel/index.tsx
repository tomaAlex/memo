import React, { useState } from "react";
import { View, ViewProps } from "react-native";
import CarouselNavigationButton from "./CarouselNavigationButton";

type TProps = ViewProps & {
	children: React.ReactNode;
};

const Carousel = ({ children, ...viewProps }: TProps) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const slides = React.Children.toArray(children) as React.ReactNode[];
	const totalSlides = slides.length;
	const previewedSlide = slides[currentSlide];

	return (
		<View {...viewProps}>
			{/* <View style={{ width: "20%", height: "100%", backgroundColor: "red" }}>
				{currentSlide > 0 && <CarouselNavigationButton navigate={() => setCurrentSlide(currentSlide - 1)} />}
			</View> */}
			<View style={{ flex: 1 }}>{previewedSlide}</View>
			{/* <View
				style={{
					position: "absolute",
					width: "140%",
					height: "100%",
					flexDirection: "row",
					justifyContent: "space-between",
					alignContent: "center",
				}}
			>
				<View style={{ width: "20%", height: "100%", backgroundColor: "red" }}>
					{currentSlide < totalSlides - 1 && (
						<CarouselNavigationButton navigate={() => setCurrentSlide(currentSlide + 1)} />
					)}
				</View>
			</View> */}
		</View>
	);
};

export default React.memo(Carousel) as unknown as typeof Carousel;
