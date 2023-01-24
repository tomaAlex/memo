import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./Carousel.module.scss";

type TProps = {
	navigate: () => void;
	children?: React.ReactNode;
};

const CarouselNavigationButton = ({ navigate, children }: TProps) => {
	return (
		<TouchableOpacity style={styles.navigationButtonContainer} onPress={navigate}>
			{children}
		</TouchableOpacity>
	);
};

export default React.memo(CarouselNavigationButton) as unknown as typeof CarouselNavigationButton;
