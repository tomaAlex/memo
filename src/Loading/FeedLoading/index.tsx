import { TProps } from "Loading/LoadingPropType";
import React from "react";
import { Image } from "react-native";

const FeedLoading = ({ heigth, width }: TProps) => {
	// return <Image source={require("../../icons/DatingFeed.gif")} style={{ height: heigth, width: width }} />;
	return <Image source={require("./loading-feed.gif")} style={{ height: heigth, width: width }} />;
};

export default React.memo(FeedLoading) as unknown as typeof FeedLoading;
