import React from "react";
import { HeartIcon } from "icons/index";
import { TouchableOpacity } from "react-native";
import styles from "./SwipeControls.module.scss";
import Swiper from "react-native-deck-swiper";
import { IdentifiedUser } from "types/index";
import { cx } from "utils/index";

type TProps = {
	swiperReference: React.RefObject<Swiper<IdentifiedUser>>;
	isSwiperBlocked: boolean;
};

const SwipeRightButton = ({ swiperReference, isSwiperBlocked }: TProps) => {
	const like = () => {
		swiperReference.current?.swipeRight();
	};

	return (
		<TouchableOpacity
			disabled={isSwiperBlocked}
			style={cx(
				[styles.swipingControlsContainer__swipeRightContainer, !isSwiperBlocked],
				[styles.swipingControlsContainer__swipeRightContainer__disabled, isSwiperBlocked]
			)}
			onPress={like}
		>
			<HeartIcon
				width={25}
				height={25}
				fill={"white"}
				style={styles.swipingControlsContainer__swipeRightContainer__icon}
			/>
		</TouchableOpacity>
	);
};

export default React.memo(SwipeRightButton);
