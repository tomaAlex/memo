import { RefreshIcon } from "icons";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import UsersSwiperContext from "../UsersSwiper/UsersSwiperContext";
import styles from "./RefreshFeedButton.module.scss";

type TProps = {
	refreshFeed: () => void;
	swipedAllUsers: boolean;
};

const RefreshFeedButton = ({ refreshFeed, swipedAllUsers }: TProps) => {
	const { setSwipedAllUsers } = useContext(UsersSwiperContext);
	if (!swipedAllUsers) return null;
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				refreshFeed();
				setSwipedAllUsers(false);
			}}
		>
			<RefreshIcon style={styles.container__icon} width={50} height={50} fill={"#F10065"} />
		</TouchableOpacity>
	);
};

export default React.memo(RefreshFeedButton);
