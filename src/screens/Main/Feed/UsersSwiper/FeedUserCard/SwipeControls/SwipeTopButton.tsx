import React from "react";
import { StarIcon } from "icons/index";
import { TouchableOpacity } from "react-native";
import styles from "./SwipeControls.module.scss";
import Swiper from "react-native-deck-swiper";
import { IdentifiedUser } from "types/index";
import { cx } from "utils/index";

type TProps = {
	swiperReference: React.RefObject<Swiper<IdentifiedUser>>;
	hasInstantMatchingOn: boolean;
	isSwiperBlocked: boolean;
};

const SwipeTopButton = ({ swiperReference, hasInstantMatchingOn, isSwiperBlocked }: TProps) => {
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
