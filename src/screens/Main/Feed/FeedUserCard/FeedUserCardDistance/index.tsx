import React from "react";
import { LocationPlane } from "icons/index";
import { Text, TouchableOpacity } from "react-native";
import store from "redux/store";
import { Coordinates } from "types/index";
import { getDistanceBetweenCoordinates } from "utils/index";
import styles from "./FeedUserCardDistance.module.scss";

type TProps = {
	likedUserLocation: Coordinates;
};

const FeedUserCardDistance = ({ likedUserLocation }: TProps) => {
	const selfLocation = store.getState().user.coordinates;
	const distanceBetweenSelfAndLikedUser = getDistanceBetweenCoordinates(selfLocation, likedUserLocation);

	return (
		<TouchableOpacity style={styles.distanceContainer}>
			<LocationPlane
				style={styles.distanceContainer__icon}
				width={15}
				height={15}
				fill={"#D9D9D9"}
				stroke={"#D9D9D9"}
				color={"#D9D9D9"}
			/>
			<Text style={styles.distanceContainer__caption}>{distanceBetweenSelfAndLikedUser.toFixed(2)} km</Text>
		</TouchableOpacity>
	);
};

export default React.memo(FeedUserCardDistance);
