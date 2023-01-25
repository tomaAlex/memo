import React from "react";
import { Image } from "react-native";

type TProps = {
	height?: number;
	width?: number;
};

const Loading = ({ height = 50, width = 50 }: TProps) => {
	return <Image source={require("./loading.gif")} style={{ height, width }} />;
};

export default React.memo(Loading);
