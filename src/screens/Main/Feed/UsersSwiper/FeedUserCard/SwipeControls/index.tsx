import React from "react";
import { View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { IdentifiedUser } from "types/index";
import styles from "./SwipeControls.module.scss";
import SwipeLeftButton from "./SwipeLeftButton";
import SwipeRightButton from "./SwipeRightButton";

type TProps = {
	swiperReference: React.RefObject<Swiper<IdentifiedUser>>;
};

const SwipeControls = ({ swiperReference }: TProps) => {
	return (
		<View style={styles.swipingControlsContainer}>
			<SwipeLeftButton swiperReference={swiperReference} />
			<SwipeRightButton swiperReference={swiperReference} />
		</View>
	);
};

export default React.memo(SwipeControls);
