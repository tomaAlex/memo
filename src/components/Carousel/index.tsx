import React, { useState } from "react";
import { View, ViewProps } from "react-native";
import { ArrowLeftIcon, ArrowRightIcon } from "icons/index";
import CarouselNavigationButton from "./CarouselNavigationButton";
import OverlaidNavigation from "./OverlaidNavigation";
import CarouselIndex from "./CarouselIndex";

type TProps = ViewProps & {
	children: React.ReactNode;
	hideNavigationControls?: boolean;
	displayIndex?: boolean;
};

const Carousel = ({ children, hideNavigationControls = false, displayIndex = false, ...viewProps }: TProps) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const slides = React.Children.toArray(children) as React.ReactNode[];
	const totalSlides = slides.length;
	const previewedSlide = slides[currentSlide];
	const showNavigationControls = !hideNavigationControls;

	return (
		<View {...viewProps}>
			{displayIndex && <CarouselIndex {...{ currentSlide, totalSlides, setCurrentSlide }} />}
			{showNavigationControls && (
				<View style={{ flex: 1 }}>
					{currentSlide > 0 && (
						<CarouselNavigationButton navigate={() => setCurrentSlide(currentSlide - 1)}>
							<ArrowLeftIcon width={30} height={30} stroke={"#8A8A8A"} />
						</CarouselNavigationButton>
					)}
				</View>
			)}
			<View style={{ flex: 10 }}>{previewedSlide}</View>
			{showNavigationControls && (
				<View style={{ flex: 1 }}>
					{currentSlide < totalSlides - 1 && (
						<CarouselNavigationButton navigate={() => setCurrentSlide(currentSlide + 1)}>
							<ArrowRightIcon width={30} height={30} stroke={"#8A8A8A"} />
						</CarouselNavigationButton>
					)}
				</View>
			)}
			{hideNavigationControls && <OverlaidNavigation {...{ currentSlide, totalSlides, setCurrentSlide }} />}
		</View>
	);
};

export default React.memo(Carousel) as unknown as typeof Carousel;
