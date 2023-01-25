import React, { useContext } from "react";
import { ExitIcon } from "icons/index";
import { TouchableOpacity } from "react-native";
import styles from "./SwipeControls.module.scss";
import { cx } from "utils/index";
import UsersSwiperContext from "../../UsersSwiperContext";

const SwipeLeftButton = () => {
	const { swiperReference, isSwiperBlocked } = useContext(UsersSwiperContext);

	const dislike = () => {
		swiperReference.current?.swipeLeft();
	};

	return (
		<TouchableOpacity
			disabled={isSwiperBlocked}
			style={cx(
				[styles.swipingControlsContainer__swipeLeftContainer, !isSwiperBlocked],
				[styles.swipingControlsContainer__swipeLeftContainer__disabled, isSwiperBlocked]
			)}
			onPress={dislike}
		>
			<ExitIcon
				width={15}
				height={15}
				fill={"#F10065"}
				style={styles.swipingControlsContainer__swipeLeftContainer__icon}
			/>
		</TouchableOpacity>
	);
};

export default React.memo(SwipeLeftButton);
