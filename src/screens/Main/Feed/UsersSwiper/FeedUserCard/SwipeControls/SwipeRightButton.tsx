import React from "react";
import { HeartIcon } from "icons/index";
import Swiper from "react-native-deck-swiper";
import { IdentifiedUser } from "types/index";
import { TouchableOpacity } from "react-native";
import styles from "./SwipeControls.module.scss";

type TProps = {
	swiperReference: React.RefObject<Swiper<IdentifiedUser>>;
};

const SwipeRightButton = ({ swiperReference }: TProps) => {
	const like = () => {
		swiperReference.current?.swipeRight();
	};

	return (
		<TouchableOpacity style={styles.swipingControlsContainer__swipeRightContainer} onPress={like}>
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
