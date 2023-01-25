import React, { useContext } from "react";
import { StarIcon } from "icons/index";
import { TouchableOpacity } from "react-native";
import styles from "./SwipeControls.module.scss";
import { cx } from "utils/index";
import UsersSwiperContext from "../../UsersSwiperContext";

type TProps = {
	hasInstantMatchingOn: boolean;
};

const SwipeTopButton = ({ hasInstantMatchingOn }: TProps) => {
	const { swiperReference, isSwiperBlocked } = useContext(UsersSwiperContext);

	const instantlyMatch = () => {
		swiperReference.current?.swipeTop();
	};

	return (
		<>
			{hasInstantMatchingOn && (
				<TouchableOpacity
					disabled={isSwiperBlocked}
					style={cx(
						[styles.swipingControlsContainer__swipeTopContainer, !isSwiperBlocked],
						[styles.swipingControlsContainer__swipeTopContainer__disabled, isSwiperBlocked]
					)}
					onPress={instantlyMatch}
				>
					<StarIcon
						width={100}
						height={100}
						// fill={"#F10065"}
						style={styles.swipingControlsContainer__swipeTopContainer__icon}
					/>
				</TouchableOpacity>
			)}
		</>
	);
};

export default React.memo(SwipeTopButton);
