import React from "react";
import { ExitIcon } from "icons/index";
import Swiper from "react-native-deck-swiper";
import { IdentifiedUser } from "types/index";
import { TouchableOpacity } from "react-native";
import styles from "./SwipeControls.module.scss";

type TProps = {
	swiperReference: React.RefObject<Swiper<IdentifiedUser>>;
};

const SwipeLeftButton = ({ swiperReference }: TProps) => {
	const dislike = () => {
		swiperReference.current?.swipeLeft();
	};

	return (
		<TouchableOpacity style={styles.swipingControlsContainer__swipeLeftContainer} onPress={dislike}>
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
