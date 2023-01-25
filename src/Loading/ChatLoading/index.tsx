import { TProps } from "Loading/LoadingPropType";
import React from "react";
import { Image } from "react-native";

const ChatLoading = ({ heigth, width }: TProps) => {
	return <Image source={require("../../icons/ChatLoading.gif")} style={{ height: heigth, width: width }} />;
};

export default React.memo(ChatLoading) as unknown as typeof ChatLoading;
