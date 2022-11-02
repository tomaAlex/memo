import React from "react";
import { TouchableOpacity } from "react-native";

type TProps = {
	navigate: () => void;
};

const CarouselNavigationButton = ({ navigate }: TProps) => {
	return <TouchableOpacity style={{ flex: 1, backgroundColor: "blue" }} onPress={navigate} />;
};

export default React.memo(CarouselNavigationButton) as unknown as typeof CarouselNavigationButton;
