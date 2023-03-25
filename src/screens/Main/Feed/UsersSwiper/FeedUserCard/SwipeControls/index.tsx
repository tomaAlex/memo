import React from "react";
import { View } from "react-native";
import styles from "./SwipeControls.module.scss";
import SwipeLeftButton from "./SwipeLeftButton";
import SwipeRightButton from "./SwipeRightButton";
// import SwipeTopButton from "./SwipeTopButton";

type TProps = {
	hasInstantMatchingOn: boolean;
};

// const SwipeControls = ({ hasInstantMatchingOn }: TProps) => {
const SwipeControls = ({}: TProps) => {
	return (
		<View style={styles.swipingControlsContainer}>
			<SwipeLeftButton />
			{/* <SwipeTopButton {...{ hasInstantMatchingOn }} /> */}
			<SwipeRightButton />
		</View>
	);
};

export default React.memo(SwipeControls);
