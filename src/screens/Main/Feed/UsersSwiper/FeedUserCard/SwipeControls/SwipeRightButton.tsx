import React, { useContext } from "react";
import { HeartIcon } from "icons/index";
import { TouchableOpacity } from "react-native";
import styles from "./SwipeControls.module.scss";
import { cx } from "utils/index";
import UsersSwiperContext from "../../UsersSwiperContext";

const SwipeRightButton = () => {
	const { swiperReference, isSwiperBlocked } = useContext(UsersSwiperContext);

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
