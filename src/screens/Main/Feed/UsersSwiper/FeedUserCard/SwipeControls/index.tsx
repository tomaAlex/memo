import React from "react";
import { View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { IdentifiedUser } from "types/index";
import styles from "./SwipeControls.module.scss";
import SwipeLeftButton from "./SwipeLeftButton";
import SwipeRightButton from "./SwipeRightButton";
import SwipeTopButton from "./SwipeTopButton";

type TProps = {
	swiperReference: React.RefObject<Swiper<IdentifiedUser>>;
	hasInstantMatchingOn: boolean;
	isSwiperBlocked: boolean;
};

const SwipeControls = ({ swiperReference, hasInstantMatchingOn, isSwiperBlocked }: TProps) => {
	return (
		<View style={styles.swipingControlsContainer}>
			<SwipeLeftButton {...{ swiperReference, isSwiperBlocked }} />
			<SwipeTopButton {...{ swiperReference, isSwiperBlocked, hasInstantMatchingOn }} />
			<SwipeRightButton {...{ swiperReference, isSwiperBlocked }} />
		</View>
	);
};

export default React.memo(SwipeControls);
